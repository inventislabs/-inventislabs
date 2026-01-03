import React from "react";
import EarlyWarning from "../components/EarlyWarning";
import Footer from "../components/Footer";

const EQAlertPage = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white transition-colors duration-500">
      <main className="pt-20">
        {/* Hero Section - Responsive */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white dark:bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 sm:mb-6">
              Earthquake Early Warning System
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-[0.95] tracking-tight">
              EQ-Alert
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Seconds of advance notice to save lives and protect critical
              infrastructure across India's most vulnerable seismic zones.
            </p>
          </div>
        </section>

        {/* Main Content - EarlyWarning Component */}
        <EarlyWarning />

        {/* CTA Section - Responsive */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#F5F5F7] dark:bg-zinc-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Deploy EQ-Alert
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 font-light px-4">
              Contact us to discuss pilot programs for your region or facility.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <a
                href="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full transition-all duration-300 hover:scale-[1.02] text-center"
              >
                Request Pilot Program
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-gray-900 dark:text-white font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300 text-center"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EQAlertPage;
