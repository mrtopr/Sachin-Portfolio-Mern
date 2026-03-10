// imagesRoutes.js
const imagesController = require("../controllers/imagesController");

async function imagesRoutes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return reply.send({ message: "Images Routes are working!" });
  });
  fastify.get("/get_all_images", imagesController.getAllImages);
  fastify.get("/download_all_images", imagesController.downloadAllImages);
  fastify.get("/compress_all_images", imagesController.compressAllImages);
  fastify.get("/compress_image_folder", imagesController.compressImageFolder);
}

module.exports = imagesRoutes;
