import React, { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Footer from "../components/Footer";
import {
  Target,
  Users,
  Award,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import StoryVideo from '../assets/InventisStory.mp4';

const AboutPage = () => {
  const videoRef = useRef(null);

  const impactRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set volume to 100%
    video.volume = 1.0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => console.log("Autoplay prevented:", err));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Impact Stats Animation
      const statItems = gsap.utils.toArray(".impact-stat");

      statItems.forEach((item) => {
        const numberEl = item.querySelector(".stat-number");
        const targetValue = parseInt(numberEl.getAttribute("data-value"), 10);
        const suffix = numberEl.getAttribute("data-suffix") || "";

        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Counter Animation
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(numberEl, {
              innerHTML: targetValue,
              duration: 2,
              ease: "power2.out",
              snap: { innerHTML: 1 },
              onUpdate: function () {
                this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerHTML) + suffix;
              }
            });
          }
        });
      });

    }, impactRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display transition-colors duration-500">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            About InventisLabs
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Indigenous deep-tech innovation meets disaster resilience
            engineering.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 bg-[#F5F5F7] dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <div className="mission-card bg-white dark:bg-zinc-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-200 dark:border-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To democratize access to life-saving early warning technology and
              build a resilient India through indigenous innovation. We're
              committed to protecting lives and infrastructure in seismically
              vulnerable regions.
            </p>
          </div>

          <div className="mission-card bg-white dark:bg-zinc-950 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-200 dark:border-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To establish India as a global leader in earthquake early warning
              systems and structural monitoring, setting new standards for
              disaster preparedness in emerging economies worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Video Section - Company Story */}
          <div className="mb-16 md:mb-20 group">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center leading-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-blue-500/20 bg-gradient-to-br from-gray-900 to-black hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-500">
              {/* Gradient Overlay for Premium Look */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

              <video
                ref={videoRef}
                controls
                loop
                playsInline
                className="w-full h-auto relative z-0 transition-transform duration-500"
                style={{
                  filter: 'contrast(1.05) brightness(0.98)',
                }}
              >
                <source src={StoryVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Play Indicator */}
              <div className="absolute top-4 right-4 z-20 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Featured Video
              </div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-6 text-base font-bold">
              <span className="text-blue-600 dark:text-blue-400">PM Modi</span> tells about Earthquake Early Warning detection system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20">
            <div className="story-item">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Born from Necessity & Innovation
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  InventisLabs is not a typical Silicon Valley-style startup. We
                  are a{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    deep-tech company rooted in Uttar Pradesh
                  </span>
                  , driven by the reality of India's seismic vulnerability.
                </p>
                <p>
                  Seeing the gaps in existing disaster management infrastructure,
                  we set out to build a solution that is not only technologically
                  advanced but also{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    economically viable for mass deployment
                  </span>{" "}
                  in Indian cities.
                </p>
                <p>
                  Working closely with research guidance from{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    IIT Roorkee's Earthquake Engineering experts
                  </span>
                  , we have developed a system that rivals global standards while
                  being 100% indigenous.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="story-item bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-zinc-900 dark:to-blue-950/10 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-white/10">
              <h3 className="text-2xl font-bold mb-8">Our Journey</h3>
              <div className="relative border-l-2 border-gray-300 dark:border-zinc-700 space-y-10 pl-8">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-zinc-900"></div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    2021
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Concept & Early R&D. Validating MEMS sensor feasibility for
                    Indian conditions.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white dark:border-zinc-900"></div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    2023
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Field-ready prototypes & lab testing at IIT Roorkee. First
                    successful pilot deployments.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-purple-600 border-4 border-white dark:border-zinc-900 animate-pulse"></div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    2024 - Present
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Commercial launch of EQ-Alert, policy engagement, and
                    expansion to 1,300+ sensor nodes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 bg-[#F5F5F7] dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Core Values
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            <div className="value-card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Every decision we make is driven by our commitment to protecting
                lives and critical infrastructure.
              </p>
            </div>

            <div className="value-card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We push the boundaries of what's possible with indigenous
                technology and engineering excellence.
              </p>
            </div>

            <div className="value-card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Scalability</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Building solutions that can be deployed nationwide without
                compromising on quality or performance.
              </p>
            </div>

            <div className="value-card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We maintain the highest standards in engineering, testing, and
                deployment of our systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section ref={impactRef} className="py-24 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center lg:text-left">
            <div className="inline-block mb-4">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                Measurable Resilience
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed lg:mx-0 mx-auto">
              Making India safer, one sensor at a time. Deploying critical infrastructure where it matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Stat 1 */}
            <div className="impact-stat bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center hover:border-blue-500/50 transition-colors duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none group">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                <span className="stat-number" data-value="1300" data-suffix="+">0</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                Active Sensor Nodes
              </div>
            </div>

            {/* Stat 2 */}
            <div className="impact-stat bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center hover:border-purple-500/50 transition-colors duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none group">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                <span className="stat-number" data-value="4" data-suffix="">0</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                Seismic Regions Covered
              </div>
            </div>

            {/* Stat 3 */}
            <div className="impact-stat bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center hover:border-emerald-500/50 transition-colors duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none group">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                <span className="stat-number" data-value="12" data-suffix="">0</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                States & UTs
              </div>
            </div>

            {/* Stat 4 */}
            <div className="impact-stat bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center hover:border-orange-500/50 transition-colors duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none group">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                <span className="stat-number" data-value="100" data-suffix="M+">0</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide">
                People Under Coverage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 bg-[#F5F5F7] dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Leadership Team
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
              A diverse team of engineers, researchers, and innovators committed
              to disaster resilience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {[
              {
                name: "Rahul Singh",
                role: "Co-founder & EEW Systems Lead",
                bio: "Ex-IoT Engineer with 8+ years in sensor networks. Leading EQ-Alert architecture and deployment strategy.",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                name: "Priya Sharma",
                role: "Head of Operations",
                bio: "Driving public-private partnerships and government liaisons. Former consultant at NITI Aayog.",
                icon: <Users className="w-6 h-6" />,
              },
              {
                name: "Amit Verma",
                role: "Lead Firmware Engineer",
                bio: "Embedded systems expert specializing in real-time processing. IIT Roorkee alumnus with edge computing expertise.",
                icon: <Shield className="w-6 h-6" />,
              },
            ].map((member, i) => (
              <div
                key={i}
                className="team-card bg-white dark:bg-zinc-950 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {member.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide mb-4">
                  {member.role}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Ecosystem & Partners
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Collaborating with leading institutions and organizations to build
              a safer India
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {/* IIT Roorkee - Official Navy Blue */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#003d82] dark:border-[#0052b4] hover:shadow-[0_10px_40px_rgba(0,61,130,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center text-center cursor-pointer group">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#003d82] dark:text-[#0052b4] group-hover:scale-110 transition-transform">
                IIT Roorkee
              </span>
            </div>

            {/* ASSOCHAM - Official Red/Maroon */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#b91c1c] dark:border-[#dc2626] hover:shadow-[0_10px_40px_rgba(185,28,28,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center text-center cursor-pointer group">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#b91c1c] dark:text-[#dc2626] group-hover:scale-110 transition-transform">
                ASSOCHAM
              </span>
            </div>

            {/* IIIT Lucknow - Blue */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#1e40af] dark:border-[#2563eb] hover:shadow-[0_10px_40px_rgba(30,64,175,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center text-center cursor-pointer group">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e40af] dark:text-[#2563eb] group-hover:scale-110 transition-transform">
                IIIT Lucknow
              </span>
            </div>

            {/* Startup India - Saffron Orange */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#ea580c] dark:border-[#f97316] hover:shadow-[0_10px_40px_rgba(234,88,12,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center text-center cursor-pointer group">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#ea580c] dark:text-[#f97316] group-hover:scale-110 transition-transform">
                Startup India
              </span>
            </div>

            {/* NDMA - Authority Red */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#991b1b] dark:border-[#b91c1c] hover:shadow-[0_10px_40px_rgba(153,27,27,0.3)] hover:scale-105 transition-all duration-300 flex items-center justify-center text-center cursor-pointer group col-span-2 sm:col-span-1">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#991b1b] dark:text-[#b91c1c] group-hover:scale-110 transition-transform">
                NDMA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Us in Building a Safer India
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Whether you're a government body, enterprise, or research
            institution, let's collaborate to protect lives and infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Get in Touch
            </a>
            <a
              href="/careers"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
