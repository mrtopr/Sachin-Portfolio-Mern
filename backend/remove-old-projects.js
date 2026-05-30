const { MongoClient } = require("mongodb");
require("dotenv").config();

const TO_REMOVE = ["NCERT Books Portal", "Bat Ball Wicket"];

(async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const col = client
    .db(process.env.MONGO_DB_NAME || "SachinPortfolioDB")
    .collection("projectTable");

  const result = await col.deleteMany({ projectTitle: { $in: TO_REMOVE } });
  console.log(`🗑  Deleted ${result.deletedCount} project(s):`, TO_REMOVE);

  const remaining = await col
    .find({}, { projection: { projectTitle: 1 } })
    .toArray();
  console.log(
    "✅ Remaining projects:",
    remaining.map((p) => p.projectTitle)
  );

  await client.close();
})().catch(console.error);
