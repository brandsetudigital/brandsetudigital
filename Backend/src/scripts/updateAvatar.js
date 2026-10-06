const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function updateBlogAvatars() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/brandsetu";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for avatar update...");

    const collection = mongoose.connection.collection("blogs");
    const result = await collection.updateMany(
      {},
      {
        $set: {
          "author.avatar": "/assets/brandsetu-avatar.png",
        },
      }
    );

    console.log(`Successfully updated ${result.modifiedCount} blogs with BrandSetu logo avatar.`);
  } catch (error) {
    console.error("Error updating blog avatars:", error);
  } finally {
    await mongoose.disconnect();
  }
}

updateBlogAvatars();
