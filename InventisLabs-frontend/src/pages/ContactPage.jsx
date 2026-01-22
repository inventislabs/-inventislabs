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
                    InventisLabs Pvt. Ltd.
                    <br />
                    A- 44 Vasundhara, Chinhat Lucknow- 226028
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
                    support@inventislabs.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    +91 7011254007
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
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 ml-1">
                        OrganizationType
                      </label>
                      <div className="relative">
                        <select className="appearance-none w-full px-5 py-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-600 dark:text-gray-300 shadow-sm">
                          <option>Government / PSU</option>
                          <option>Private Corporation</option>
                          <option>Startup</option>
                          <option>Research Institute</option>
                          <option>Other</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 ml-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="+91 98765 00000"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 ml-1">
                        Location (State, City)
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
                        placeholder="e.g. Lucknow, UP"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 ml-1">
                      Area of Interest
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "State-wide EEW",
                        "City / Smart City EEW",
                        "Industrial Plant EEW",
                        "Structural Monitoring",
                        "IoT Development",
                      ].map((item, i) => (
                        <label
                          key={i}
                          className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
                        >
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-white/5 transition-all checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400"
                            />
                            <svg
                              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 ml-1">
                      Message / Requirements
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm resize-none"
                      placeholder="Tell us more about your pilot needs..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer relative bg-gray-900 dark:bg-white/10 py-3 rounded-full min-h-[3.5rem] group flex items-center justify-start hover:bg-green-400 transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]"
                >
                  <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
                    <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"></div>
                    <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-green-400 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black">
                      <div className="size-[1rem] text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 16"
                          height="100%"
                          width="100%"
                        >
                          <path
                            fill="currentColor"
                            d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-black text-white font-bold text-center text-lg">
                    Submit Request
                  </div>
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
