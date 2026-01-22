const mongoose = require("mongoose");
require("dotenv").config();

console.log("🔍 Checking Database...\n");
console.log("MongoDB URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected\n");

    // List all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("📁 Collections in database:");
    collections.forEach((col) => console.log("  -", col.name));

    // Check each collection count
    console.log("\n📊 Document counts:");
    for (const col of collections) {
      const count = await mongoose.connection.db
        .collection(col.name)
        .countDocuments();
      console.log(`  - ${col.name}: ${count} documents`);
    }

    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
