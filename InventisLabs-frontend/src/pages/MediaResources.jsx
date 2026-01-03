import React from "react";
import { FileText, Mic, Download, ExternalLink } from "lucide-react";
import Footer from "../components/Footer";

const MediaResources = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display pt-20 transition-colors duration-500">
      <section className="bg-[#F5F5F7] dark:bg-zinc-900 py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Media & Resources
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
            Latest announcements, technical explainers, and documents for policy
            makers and partners.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Press & Announcements */}
          <div className="mb-16 sm:mb-20 md:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 flex items-center gap-2 sm:gap-3">
              <Mic className="text-blue-600" /> Press & Announcements
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {/* Card 1 */}
              <div className="press-card group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-8 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                    Proposal
                  </span>
                  <span className="text-sm text-gray-400">Dec 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  ASSOCHAM UP – EQ-Alert Pilot Proposal
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  A comprehensive proposal for deploying state-wide earthquake
                  early warning systems in Uttar Pradesh.
                </p>
                <button className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-white group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </button>
              </div>

              {/* Card 2 */}
              <div className="press-card group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-8 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase">
                    Concept Note
                  </span>
                  <span className="text-sm text-gray-400">Nov 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                  NTTM–GREAT: Smart Geotechnical Textiles
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Technical concept note on integrating IoT sensors with
                  geotechnical textiles for infrastructure safety.
                </p>
                <button className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-white group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Explainers & Downloads */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 flex items-center gap-2 sm:gap-3">
              <FileText className="text-green-600" /> Explainers & Downloads
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 3 */}
              <div className="explainer-card bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4">
                  <FileText
                    size={20}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </div>
                <h4 className="font-bold mb-2">What is EEW?</h4>
                <p className="text-xs text-gray-500 mb-4">
                  A simple guide to understanding P-waves, S-waves, and warning
                  times.
                </p>
                <button className="w-full py-2 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-white/10 text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <Download size={14} /> Download PDF
                </button>
              </div>

              {/* Card 4 */}
              <div className="explainer-card bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4">
                  <FileText
                    size={20}
                    className="text-gray-600 dark:text-gray-300"
                  />
                </div>
                <h4 className="font-bold mb-2">Technical Brochure</h4>
                <p className="text-xs text-gray-500 mb-4">
                  Detailed specs of EQ-Alert sensors, sirens, and gateways.
                </p>
                <button className="w-full py-2 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-white/10 text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Simple Arrow Component helper for this file
const ArrowRight = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default MediaResources;
