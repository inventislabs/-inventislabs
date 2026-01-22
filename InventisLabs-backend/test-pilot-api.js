const axios = require("axios");

const testData = {
  fullName: "Test User",
  organizationType: "Government / PSU",
  phone: "+91 9876543210",
  email: "test@example.com",
  location: "Lucknow, UP",
  areaOfInterest: ["State-wide EEW", "City / Smart City EEW"],
  message: "This is a test pilot request",
};

console.log("🧪 Testing Pilot Request API...\n");
console.log(
  "Sending POST request to: http://localhost:5000/api/pilot-request\n",
);

axios
  .post("http://localhost:5000/api/pilot-request", testData)
  .then((response) => {
    console.log("✅ Success!");
    console.log("Response:", JSON.stringify(response.data, null, 2));
  })
  .catch((error) => {
    console.error("❌ Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("No response received. Is the server running?");
      console.error("Run: npm run dev");
    } else {
      console.error(error.message);
    }
  });
