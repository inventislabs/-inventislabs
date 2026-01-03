import React from "react";
import {
  Activity,
  Radio,
  Cpu,
  ArrowRight,
  Clock,
  Zap,
  Shield,
  Bell,
} from "lucide-react";

const WhatWeDo = () => {
  const cards = [
    {
      title: "EQ-Alert: Earthquake Early Warning",
      subtext:
        "Regional and site-specific EEW for states, cities, and industrial clusters.",
      icon: <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      link: "/solutions/eq-alert",
    },
    {
      title: "Structural & Geotechnical Monitoring",
      subtext:
        "Smart sensing for bridges, buildings, and industrial foundations.",
      icon: <Radio className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
      link: "/solutions/structural-monitoring",
    },
    {
      title: "Embedded & IoT Engineering Lab",
      subtext:
        "Custom hardware–software systems for founders, enterprises, and research labs.",
      icon: <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      link: "/solutions/iot-engineering",
    },
  ];

  return (
    <section
      id="solutions"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F5F5F7] dark:bg-zinc-900 transition-colors duration-500 font-display"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            What InventisLabs Does
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Delivering advanced sensing solutions for critical infrastructure
            and public safety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="what-card group relative bg-white dark:bg-black p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10 hover:-translate-y-2 flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-5 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                  {card.subtext}
                </p>
              </div>

              <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

        {/* Why Early Warning Matters Section */}
        <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-orange-100/30 to-blue-100/30 dark:from-orange-900/10 dark:to-blue-900/10 rounded-full blur-3xl -z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center relative z-10">
              {/* Left: Text Content */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  Why Early Warning{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                    Matters
                  </span>
                </h3>

                <div className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="text-base sm:text-lg leading-relaxed">
                    <span className="font-bold text-gray-900 dark:text-white">
                      India lies in one of the world's most seismically active
                      zones,
                    </span>{" "}
                    with over 59% of the landmass prone to moderate to severe
                    earthquakes.
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed">
                    Even{" "}
                    <span className="font-semibold text-orange-600 dark:text-orange-400">
                      10-30 seconds of warning
                    </span>{" "}
                    can enable:
                  </p>

                  <ul className="space-y-2.5 sm:space-y-3 ml-4 sm:ml-6">
                    <li className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs sm:text-sm">
                        Automated shutdown of critical machinery, gas lines, and
                        nuclear facilities
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-xs sm:text-sm">
                        Mass public alerts via sirens, mobile apps, and SMS
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-xs sm:text-sm">
                        Life-saving actions: Drop, Cover, Hold On
                      </span>
                    </li>
                  </ul>

                  <p className="text-xs sm:text-sm italic text-gray-600 dark:text-gray-400 pt-3 sm:pt-4">
                    "Every second counts in saving lives and protecting
                    infrastructure."
                  </p>
                </div>
              </div>

              {/* Right: Timeline Infographic */}
              <div className="relative mt-8 lg:mt-0">
                <div className="bg-white/60 dark:bg-zinc-950/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200/50 dark:border-white/5 shadow-2xl">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
                    EQ-Alert Timeline
                  </h4>

                  <div className="space-y-5 sm:space-y-6 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[19px] sm:left-[23px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 via-orange-200 to-red-200 dark:from-blue-800 dark:via-orange-800 dark:to-red-800" />

                    {/* Step 1: Detection */}
                    <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="pt-0.5 sm:pt-1">
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                          Detection
                        </h5>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          Sensors detect P-waves instantly
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Alert */}
                    <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="pt-0.5 sm:pt-1">
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                          Alert Broadcast
                        </h5>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          Warning sent to region in milliseconds
                        </p>
                      </div>
                    </div>

                    {/* Step 3: Auto-shutdown */}
                    <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="pt-0.5 sm:pt-1">
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                          Auto-Shutdown
                        </h5>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          Critical systems respond automatically
                        </p>
                      </div>
                    </div>

                    {/* Step 4: Shaking */}
                    <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 flex-shrink-0">
                        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="pt-0.5 sm:pt-1">
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                          Strong Shaking
                        </h5>
                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          S-waves arrive, population prepared
                        </p>
                      </div>
                    </div>

                    {/* Time Badge */}
                    <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-200 dark:border-white/5 flex items-center justify-center gap-2">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                        10-30 seconds lead time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
