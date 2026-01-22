const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");
const Job = require("./models/Job");
const PilotRequest = require("./models/PilotRequest");

console.log("🚀 Adding Mock Data to Admin Panel...\n");

const mockContacts = [
  {
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@government.in",
    subject: "State-wide EEW Implementation Inquiry",
    message:
      "We are interested in implementing earthquake early warning system across Uttarakhand state. Please share details about pilot program and costs.",
    read: false,
    starred: false,
  },
  {
    fullName: "Priya Sharma",
    email: "priya.sharma@smartcity.in",
    subject: "Smart City Integration",
    message:
      "Our smart city project in Indore needs seismic monitoring. Can we integrate your EEW system with our existing infrastructure?",
    read: false,
    starred: true,
  },
  {
    fullName: "Dr. Amit Patel",
    email: "amit.patel@iit.ac.in",
    subject: "Research Collaboration Proposal",
    message:
      "IIT Delhi research team wants to collaborate on earthquake detection algorithms. Interested in joint research project.",
    read: true,
    starred: true,
  },
];

const mockJobs = [
  {
    jobId: "IOT-ENG-2026-01",
    title: "Senior IoT Engineer",
    location: "Lucknow, UP",
    type: "Full-time",
    department: "Engineering",
    description:
      "Lead development of IoT-based earthquake early warning systems. Work on sensor networks, real-time data processing, and alert systems.",
    salary: "₹12-18 LPA",
    experience: "3-5 years",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    responsibilities: [
      "Design and develop IoT sensor networks for seismic monitoring",
      "Implement real-time data processing algorithms",
      "Integrate alert systems with mobile and web platforms",
      "Collaborate with research team on ML models",
    ],
    requirements: [
      "B.Tech/M.Tech in Electronics/Computer Science",
      "Strong experience with IoT protocols (MQTT, CoAP)",
      "Proficiency in Python, C++, and embedded systems",
      "Knowledge of cloud platforms (AWS/Azure)",
    ],
    niceToHave: [
      "Experience with seismic/geophysical systems",
      "Machine learning background",
      "Open source contributions",
    ],
    status: "Open",
    pinned: true,
  },
  {
    jobId: "ML-ENG-2026-02",
    title: "Machine Learning Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Data Science",
    description:
      "Develop ML models for earthquake prediction and pattern recognition. Work with large-scale seismic datasets.",
    salary: "₹15-22 LPA",
    experience: "4-6 years",
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    responsibilities: [
      "Build ML models for earthquake detection",
      "Analyze seismic data patterns",
      "Optimize alert accuracy and reduce false positives",
      "Deploy models to production",
    ],
    requirements: [
      "Masters/PhD in Computer Science or related field",
      "Expert in Python, TensorFlow, PyTorch",
      "Experience with time-series analysis",
      "Strong mathematical background",
    ],
    niceToHave: [
      "Publications in ML conferences",
      "Experience with edge AI",
      "Knowledge of geophysics",
    ],
    status: "Open",
    pinned: false,
  },
  {
    jobId: "PM-2026-03",
    title: "Product Manager - EEW Systems",
    location: "Noida, UP",
    type: "Full-time",
    department: "Product",
    description:
      "Lead product strategy for earthquake early warning solutions. Work with government clients and stakeholders.",
    salary: "₹18-25 LPA",
    experience: "5-8 years",
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    responsibilities: [
      "Define product roadmap and strategy",
      "Work with government and enterprise clients",
      "Coordinate with engineering and design teams",
      "Manage pilot deployments",
    ],
    requirements: [
      "MBA or equivalent experience",
      "5+ years in product management",
      "Experience with B2G or enterprise products",
      "Strong communication skills",
    ],
    niceToHave: [
      "Experience in IoT/hardware products",
      "Government sector experience",
      "Technical background",
    ],
    status: "Open",
    pinned: false,
  },
];

const mockPilotRequests = [
  {
    fullName: "Dr. Sanjay Verma",
    organizationType: "Government / PSU",
    phone: "+91 9876543210",
    email: "sanjay.verma@ndma.gov.in",
    location: "Delhi, NCR",
    areaOfInterest: ["State-wide EEW", "City / Smart City EEW"],
    message:
      "NDMA is evaluating earthquake early warning systems for NCR region. Need detailed proposal for pilot covering 5 districts with 100+ sensors.",
    status: "New Request",
    priority: "High",
    read: false,
  },
  {
    fullName: "Meera Krishnan",
    organizationType: "Private Enterprise",
    phone: "+91 9988776655",
    email: "meera.k@tataprojects.com",
    location: "Mumbai, Maharashtra",
    areaOfInterest: ["Industrial Plant EEW", "Structural Monitoring"],
    message:
      "We have a chemical plant in seismic zone III. Require real-time monitoring of 15 critical structures and immediate alert system.",
    status: "Under Review",
    priority: "Urgent",
    read: true,
  },
  {
    fullName: "Arun Khanna",
    organizationType: "Smart City",
    phone: "+91 9123456789",
    email: "arun.khanna@lucknowsmartcity.in",
    location: "Lucknow, UP",
    areaOfInterest: ["City / Smart City EEW", "IoT Development"],
    message:
      "Lucknow Smart City mission wants to integrate EEW into our IoT infrastructure. Looking for phased deployment starting with municipal buildings.",
    status: "New Request",
    priority: "Medium",
    read: false,
  },
];

async function populateDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Add Contacts
    console.log("📧 Adding Contact Messages...");
    for (const contact of mockContacts) {
      const newContact = new Contact(contact);
      await newContact.save();
      console.log(`   ✓ ${contact.fullName}`);
    }

    // Add Jobs
    console.log("\n💼 Adding Jobs...");
    for (const job of mockJobs) {
      const newJob = new Job(job);
      await newJob.save();
      console.log(`   ✓ ${job.title}`);
    }

    // Add Pilot Requests
    console.log("\n🚀 Adding Pilot Requests...");
    for (const request of mockPilotRequests) {
      const newRequest = new PilotRequest(request);
      await newRequest.save();
      console.log(`   ✓ ${request.fullName} - ${request.organizationType}`);
    }

    console.log("\n✅ Mock data added successfully!");
    console.log("\n📊 Summary:");
    console.log(`   • Contact Messages: ${mockContacts.length}`);
    console.log(`   • Jobs: ${mockJobs.length}`);
    console.log(`   • Pilot Requests: ${mockPilotRequests.length}`);
    console.log(
      `   • Total: ${mockContacts.length + mockJobs.length + mockPilotRequests.length} records\n`,
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

populateDatabase();
