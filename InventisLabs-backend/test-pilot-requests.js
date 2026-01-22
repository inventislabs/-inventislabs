const mongoose = require("mongoose");
require("dotenv").config();

console.log("🔍 Testing Pilot Request System...\n");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    const PilotRequest = require("./models/PilotRequest");
    return PilotRequest.find().sort({ submittedDate: -1 }).limit(10);
  })
  .then((requests) => {
    console.log(`\n📋 Total Pilot Requests in DB: ${requests.length}\n`);
    if (requests.length === 0) {
      console.log("⚠️  No pilot requests found in database");
    } else {
      requests.forEach((req, index) => {
        console.log(`${index + 1}. ${req.fullName}`);
        console.log(`   Organization: ${req.organizationType}`);
        console.log(`   Email: ${req.email}`);
        console.log(`   Phone: ${req.phone}`);
        console.log(`   Location: ${req.location}`);
        console.log(`   Status: ${req.status}`);
        console.log(`   Date: ${req.submittedDate}`);
        console.log("   ---");
      });
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
