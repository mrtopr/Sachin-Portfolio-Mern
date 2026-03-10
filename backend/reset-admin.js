// reset-admin.js
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// Get your live MongoDB connection (Make sure MONGO_URI is accurate in your backend/.env)
// If it crashes because MONGO_URI is missing, manually paste your string below inside the quotes!
const uri = process.env.MONGO_URI || "PASTE_YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE"; 

async function resetAdmin() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    
    // Connect to the specific database
    const db = client.db(process.env.MONGO_DB_NAME || "SachinPortfolioDB");     

    console.log("Connected successfully to server");

    // Put your Desired Username and Password here:
    const myNewUsername = "sachin";
    const myNewPassword = "adminpassword123";

    // Hash them for security
    const hashedUsername = await bcrypt.hash(myNewUsername, 10);
    const hashedPassword = await bcrypt.hash(myNewPassword, 10);

    // Delete any old admin accounts
    await db.collection("SachinPortfolio").deleteMany({});

    // Create your new Admin Account!
    await db.collection("SachinPortfolio").insertOne({
      userName: hashedUsername,
      password: hashedPassword,
    });

    console.log(`✅ Success! Admin account reset!`);
    console.log(`Your Username is: ${myNewUsername}`);
    console.log(`Your Password is: ${myNewPassword}`);
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

resetAdmin();