import React, { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display pt-20 transition-colors duration-500">
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 xl:gap-24">
          {/* Left: Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              Pilot EQ-Alert in Your Region or Plant
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 sm:mb-12 leading-relaxed">
              Share your details and requirements. The InventisLabs team will
              follow up with a tailored pilot or deployment plan.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Headquarters</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Lucknow / Bahraich, Uttar Pradesh
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    contact@inventislabs.com
                    <br />
                    pilots@inventislabs.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-[#F5F5F7] dark:bg-zinc-900 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Received</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Thank you. The EQ-Alert team will get in touch shortly to
                  discuss your use case.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      Organization
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-500">
                      <option>Government / PSU</option>
                      <option>Private Corporation</option>
                      <option>Startup</option>
                      <option>Research Institute</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="+91 98765 00000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="name@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                    Location (State, City)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="e.g. Lucknow, UP"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
                    Area of Interest
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "State-wide EEW",
                      "City / Smart City EEW",
                      "Industrial Plant EEW",
                      "Structural Monitoring",
                      "IoT Development",
                    ].map((item, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/5 bg-white dark:bg-black cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                    Message / Requirements
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Tell us more about your pilot needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Submit Request <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
