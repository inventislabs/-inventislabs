import React from "react";
import Footer from "../components/Footer";
import StructuralMonitoringMap from "../components/StructuralMonitoringMap";

const IoTEngineeringPage = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white transition-colors duration-500">
      <main className="pt-20">
        {/* ================= HERO ================= */}
        <section className="py-16 sm:py-24 md:py-32 bg-white dark:bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 sm:mb-6">
              Custom IoT Development
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-[0.95] tracking-tight">
              IoT Engineering Lab
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Full-stack IoT product development from concept to
              production—hardware, firmware, cloud, and mobile apps.
            </p>
          </div>
        </section>

        {/* ================= WHAT WE DO ================= */}
        <section className="py-16 sm:py-20 md:py-28 bg-[#F5F5F7] dark:bg-zinc-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tight">
              Complete IoT Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Our engineering lab specializes in end-to-end IoT product
              development. From rapid prototyping to production-ready devices
              with cloud integration, mobile apps, and edge AI capabilities. We
              handle every layer of the IoT stack.
            </p>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="py-16 sm:py-20 md:py-28 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-10 sm:mb-12 md:mb-16 tracking-tight">
              Our Engineering Capabilities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {[
                {
                  title: "Hardware Design",
                  desc: "Custom PCB design, sensor integration, low-power embedded systems, and wireless connectivity (WiFi, BLE, LoRa, Cellular).",
                },
                {
                  title: "Firmware Development",
                  desc: "Real-time embedded software, edge AI/ML models, secure boot, OTA updates, and sensor fusion algorithms.",
                },
                {
                  title: "Cloud Infrastructure",
                  desc: "Scalable backend APIs, real-time data pipelines, device management platforms, and secure authentication.",
                },
                {
                  title: "Mobile Applications",
                  desc: "Cross-platform iOS/Android apps, real-time dashboards, remote device control, and data visualization.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border-t border-gray-200 dark:border-white/10 pt-4 sm:pt-6"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F5F5F7] dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-8 sm:mb-10 md:mb-14 lg:mb-16 tracking-tight">
              Our Development Process
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
              {[
                {
                  step: "01",
                  title: "Discovery & Design",
                  desc: "Understand requirements, define architecture, and create detailed technical specifications.",
                },
                {
                  step: "02",
                  title: "Rapid Prototyping",
                  desc: "Build working prototypes to validate concepts and demonstrate functionality to stakeholders.",
                },
                {
                  step: "03",
                  title: "Development & Testing",
                  desc: "Full-stack development with continuous testing, security audits, and performance optimization.",
                },
                {
                  step: "04",
                  title: "Production & Support",
                  desc: "Manufacturing support, deployment, documentation, and ongoing maintenance services.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-800/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:bg-transparent lg:p-0 border border-gray-100 dark:border-white/5 lg:border-0"
                >
                  <div className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= DEPLOYMENT MAP ================= */}
        <section className="py-16 sm:py-20 md:py-28 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Nationwide IoT Deployments
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl">
              Our IoT solutions are deployed across multiple regions, serving
              various industries from agriculture to smart cities and industrial
              automation.
            </p>

            {/* Map Container - Fully Responsive */}
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] bg-white dark:bg-zinc-900/50 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-xl sm:shadow-2xl">
              <StructuralMonitoringMap />
            </div>

            {/* Stats Grid Below Map - Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-10 sm:mt-12 md:mt-14 lg:mt-16">
              {[
                { value: "50+", label: "IoT Projects" },
                { value: "7", label: "Active Regions" },
                { value: "1000+", label: "Connected Devices" },
                { value: "15+", label: "Industry Verticals" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-5 sm:p-6 md:p-7 bg-[#F5F5F7] dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-white/5 lg:bg-transparent lg:border-0 lg:p-0"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHO WE SERVE ================= */}
        <section className="py-16 sm:py-20 md:py-28 bg-[#F5F5F7] dark:bg-zinc-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-8 sm:mb-10 tracking-tight">
              Who We Serve
            </h2>
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Startups building MVP IoT products for funding rounds
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Enterprises modernizing legacy systems with IoT</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Research institutions developing proof-of-concept devices
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>
                  Industrial clients requiring custom automation solutions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Smart city initiatives and infrastructure projects</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Build Your IoT Product
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 font-light px-4">
              From rapid prototyping to production-ready devices. Let's bring
              your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <a
                href="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full transition-all duration-300 hover:scale-[1.02] text-center"
              >
                Start Your Project
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-gray-900 dark:text-white font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300 text-center"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IoTEngineeringPage;
