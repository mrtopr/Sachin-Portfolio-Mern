const { MongoClient } = require("mongodb");
require("dotenv").config();

const PROJECT_IMAGES = [
  { projectTitle: "SentinelLink", projectImages: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"] },
  { projectTitle: "NCERT Books Portal", projectImages: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"] },
  { projectTitle: "Bat Ball Wicket", projectImages: ["https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"] },
  { projectTitle: "Mehfil - Music Player", projectImages: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"] },
  { projectTitle: "ThoughtOS", projectImages: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"] },
  { projectTitle: "Placement IIIT-IE", projectImages: ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"] },
  { projectTitle: "EduArchive", projectImages: ["https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"] },
];

async function run() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db(process.env.MONGO_DB_NAME || "SachinPortfolioDB");
  const col = db.collection("projectTable");
  for (const { projectTitle, projectImages } of PROJECT_IMAGES) {
    const result = await col.updateOne({ projectTitle }, { $set: { projectImages } });
    console.log(result.matchedCount === 0 ? "NOT FOUND: " + projectTitle : "Updated: " + projectTitle);
  }
  await client.close();
  console.log("Done.");
}
run().catch(console.error);
