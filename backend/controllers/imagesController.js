// controllers/imagesController.js
const fs = require("fs");
const path = require("path");
// Dynamic import for ESM node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const sharp = require("sharp");
const { getDB } = require("../config/mongodb");

// Collections config
const collections = [
  {
    name: "experienceTable",
    field: "experienceImages",
    titleField: "experienceTitle",
  },
  {
    name: "honorsExperienceTable",
    field: "honorsExperienceImages",
    titleField: "honorsExperienceTitle",
  },
  {
    name: "involvementTable",
    field: "involvementImages",
    titleField: "involvementTitle",
  },
  { name: "projectTable", field: "projectImages", titleField: "projectTitle" },
  {
    name: "yearInReviewTable",
    field: "yearInReviewImages",
    titleField: "yearInReviewTitle",
  },
  { name: "FeedTable", field: "feedImageURL", titleField: "feedTitle" },
];

// Utility: sanitize folder names
function sanitizeTitle(title) {
  return title
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .trim()
    .substring(0, 100);
}

// Utility: format bytes to human-readable
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

// Internal: fetch all image URLs grouped by collection and item
async function fetchAllImagesData() {
  const db = getDB();
  const result = {};

  for (const { name, field, titleField } of collections) {
    const docs = await db
      .collection(name)
      .find({ deleted: { $ne: true } })
      .toArray();

    result[name] = {};
    docs.forEach((doc) => {
      const rawTitle = doc[titleField] || `item_${doc._id}`;
      const title = sanitizeTitle(rawTitle);
      const images = [];
      if (Array.isArray(doc[field])) images.push(...doc[field]);
      else if (typeof doc[field] === "string") images.push(doc[field]);
      if (images.length) result[name][title] = images;
    });
  }

  return result;
}

// Handler: GET /api/images/get_all_images
async function getAllImages(request, reply) {
  try {
    const data = await fetchAllImagesData();
    reply.send(data);
  } catch (err) {
    console.error("getAllImages error:", err);
    reply.code(500).send({ error: "Failed to fetch image URLs." });
  }
}

// Handler: GET /api/images/download_all_images
async function downloadAllImages(request, reply) {
  try {
    const allImages = await fetchAllImagesData();
    const baseDir = path.resolve(
      __dirname,
      "..",
      "data",
      "Images",
      "downloaded_images"
    );

    let totalCount = 0,
      existingCount = 0,
      newCount = 0;

    for (const [collection, items] of Object.entries(allImages)) {
      for (const [title, urls] of Object.entries(items)) {
        const dir = path.join(baseDir, collection, title);
        fs.mkdirSync(dir, { recursive: true });

        for (const url of urls) {
          totalCount++;
          try {
            const res = await fetch(url);
            if (!res.ok) {
              console.error(
                `Skip download ${url}: ${res.status} ${res.statusText}`
              );
              existingCount++;
              continue;
            }
            const pathname = new URL(url).pathname;
            const filename = path.basename(pathname);
            const filePath = path.join(dir, filename);
            if (fs.existsSync(filePath)) {
              existingCount++;
              continue;
            }
            const buffer = await res.buffer();
            fs.writeFileSync(filePath, buffer);
            newCount++;
          } catch (e) {
            console.error(`Error fetching ${url}:`, e.message);
          }
        }
      }
    }

    console.log(
      `Downloaded Total: ${totalCount} | Existing: ${existingCount} | New: ${newCount}`
    );
    reply.send({
      success: true,
      message: "All images downloaded.",
      stats: { total: totalCount, existing: existingCount, new: newCount },
    });
  } catch (err) {
    console.error("downloadAllImages error:", err);
    reply.code(500).send({ error: "Image download failed." });
  }
}

// Handler: GET /api/images/compress_all_images
async function compressAllImages(request, reply) {
  try {
    const srcBase = path.resolve(
      __dirname,
      "..",
      "data",
      "Images",
      "downloaded_images"
    );
    const destBase = path.resolve(
      __dirname,
      "..",
      "data",
      "Images",
      "compressed_images"
    );

    let totalCount = 0,
      existingCount = 0,
      newCount = 0;
    let originalSize = 0,
      compressedSize = 0;

    for (const { name } of collections) {
      const collectionDir = path.join(srcBase, name);
      if (!fs.existsSync(collectionDir)) continue;

      for (const title of fs.readdirSync(collectionDir)) {
        const itemDir = path.join(collectionDir, title);
        if (!fs.statSync(itemDir).isDirectory()) continue;

        const destDir = path.join(destBase, name, title);
        fs.mkdirSync(destDir, { recursive: true });

        for (const file of fs.readdirSync(itemDir)) {
          totalCount++;
          const srcFile = path.join(itemDir, file);
          const stat = fs.statSync(srcFile);
          originalSize += stat.size;

          const basename = path.parse(file).name;
          const destFile = path.join(destDir, `${basename}.webp`);
          if (fs.existsSync(destFile)) {
            existingCount++;
            const destStat = fs.statSync(destFile);
            compressedSize += destStat.size;
            continue;
          }

          try {
            await sharp(srcFile)
              .webp({ quality: 60, lossless: false, effort: 6 })
              .toFile(destFile);
            newCount++;
            const destStat = fs.statSync(destFile);
            compressedSize += destStat.size;
          } catch (e) {
            console.error(`Compression error ${srcFile}:`, e.message);
          }
        }
      }
    }

    console.log(
      `Compressed Total: ${totalCount} | Existing: ${existingCount} | New: ${newCount}`
    );
    console.log(
      `Original Size: ${formatBytes(
        originalSize
      )} vs. Compressed Size: ${formatBytes(compressedSize)}`
    );

    reply.send({
      success: true,
      message: "All images compressed.",
      stats: {
        total: totalCount,
        existing: existingCount,
        new: newCount,
        originalSize,
        compressedSize,
      },
    });
  } catch (err) {
    console.error("compressAllImages error:", err);
    reply.code(500).send({ error: "Image compression failed." });
  }
}

// Handler: GET /api/images/compress_image_folder
async function compressImageFolder(request, reply) {
  try {
    const root = path.resolve(__dirname, "..", "data", "ImagesToCompress");
    const destRoot = path.join(root, "CompressedImages");
    fs.mkdirSync(destRoot, { recursive: true });

    let totalCount = 0,
      existingCount = 0,
      newCount = 0;
    let originalSize = 0,
      compressedSize = 0;

    // Traverse root folder (skip CompressedImages)
    for (const entry of fs.readdirSync(root)) {
      if (entry === "CompressedImages") continue;
      const srcPath = path.join(root, entry);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        // Compress each file in subfolder
        for (const file of fs.readdirSync(srcPath)) {
          totalCount++;
          const filePath = path.join(srcPath, file);
          const fileStat = fs.statSync(filePath);
          originalSize += fileStat.size;

          const basename = path.parse(file).name;
          const destFile = path.join(destRoot, `${basename}.webp`);
          if (fs.existsSync(destFile)) {
            existingCount++;
            const dStat = fs.statSync(destFile);
            compressedSize += dStat.size;
            continue;
          }
          try {
            await sharp(filePath)
              .webp({ quality: 60, lossless: false, effort: 6 })
              .toFile(destFile);
            newCount++;
            const dStat = fs.statSync(destFile);
            compressedSize += dStat.size;
          } catch (e) {
            console.error(`Error compressing ${filePath}:`, e.message);
          }
        }
      } else if (stat.isFile()) {
        totalCount++;
        originalSize += stat.size;
        const basename = path.parse(entry).name;
        const destFile = path.join(destRoot, `${basename}.webp`);
        if (fs.existsSync(destFile)) {
          existingCount++;
          const dStat = fs.statSync(destFile);
          compressedSize += dStat.size;
        } else {
          try {
            await sharp(srcPath)
              .webp({ quality: 60, lossless: false, effort: 6 })
              .toFile(destFile);
            newCount++;
            const dStat = fs.statSync(destFile);
            compressedSize += dStat.size;
          } catch (e) {
            console.error(`Error compressing ${srcPath}:`, e.message);
          }
        }
      }
    }

    console.log(
      `Compress Folder Total: ${totalCount} | Existing: ${existingCount} | New: ${newCount}`
    );
    console.log(
      `Original Folder Size: ${formatBytes(
        originalSize
      )} vs. Compressed: ${formatBytes(compressedSize)}`
    );

    reply.send({
      success: true,
      message: "Folder compressed.",
      stats: {
        total: totalCount,
        existing: existingCount,
        new: newCount,
        originalSize,
        compressedSize,
      },
    });
  } catch (err) {
    console.error("compressImageFolder error:", err);
    reply.code(500).send({ error: "Folder compression failed." });
  }
}

module.exports = {
  getAllImages,
  downloadAllImages,
  compressAllImages,
  compressImageFolder,
};
