import React, { useState, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  MessageSquare,
  Linkedin,
} from "lucide-react";
import { getApiUrl } from "../config";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    privacy: false,
  });
  const [status, setStatus] = useState("");

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Info Column Reveal
      tl.from(".contact-info-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Form Reveal
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
        },
        x: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2, // Slight delay after info
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.privacy) {
      alert("Please agree to the privacy policy");
      return;
    }

    // 1. Rate Limiting Check
    const lastSubmission = localStorage.getItem("lastSubmissionTime");
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
      const timeLeft = Math.ceil(
        (60000 - (now - parseInt(lastSubmission))) / 1000,
      );
      setStatus(`Rate limit exceeded. Please wait ${timeLeft} seconds.`);
      setTimeout(() => setStatus(""), 5000);
      return;
    }

    setStatus("Sending...");

    // 2. Input Sanitization (Basic)
    const sanitize = (str) => {
      return str ? str.toString().replace(/[<>]/g, "").trim() : "";
    };

    const payload = {
      fullName: sanitize(formData.fullName),
      email: sanitize(formData.email),
      subject: sanitize(formData.subject),
      message: sanitize(formData.message),
    };

    try {
      const response = await fetch(`${getApiUrl()}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setStatus("Message sent successfully! Check your email.");
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
          privacy: false,
        });
        localStorage.setItem("lastSubmissionTime", now.toString()); // Update rate limit

        // Optional: Still save to local storage for offline record if needed
        const messages = JSON.parse(localStorage.getItem("messages") || "[]");
        const newMessage = {
          ...payload,
          id: Date.now(),
          date: new Date().toISOString(),
        };
        localStorage.setItem(
          "messages",
          JSON.stringify([...messages, newMessage]),
        );
      } else {
        // Server returned an error
        setStatus(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("Network error. Please try again later.");
    }

    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#F5F5F7] dark:bg-black overflow-hidden transition-colors duration-500 font-display"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Info */}
          <div ref={infoRef} className="flex flex-col justify-center">
            <div className="contact-info-item mb-8 inline-flex items-center gap-2">
              <span className="w-12 h-[2px] bg-blue-600 dark:bg-blue-500"></span>
              <span className="text-blue-600 dark:text-blue-500 text-sm font-bold uppercase tracking-widest">
                Contact Us
              </span>
            </div>

            <h2 className="contact-info-item text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 leading-[1.05]">
              Let's Build a <br />
              <span className="text-gray-500 dark:text-gray-500">
                Safer Future.
              </span>
            </h2>

            <p className="contact-info-item text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed max-w-lg">
              Have questions about our technology? Our team is ready to help you
              implement the next generation of safety.
            </p>

            <div className="contact-info-item space-y-6">
              <div className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-md">
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Headquarters
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        InventisLabs Pvt. Ltd.
                        <br />
                        A- 44 Vasundhara, Chinhat Lucknow- 226028
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Email
                      </h4>
                      <a
                        href="mailto:support@inventislabs.com"
                        className="text-gray-500 dark:text-gray-400 text-sm mt-1 hover:text-blue-600 transition-colors"
                      >
                        support@inventislabs.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Phone
                      </h4>
                      <a
                        href="tel:+917011254007"
                        className="text-gray-500 dark:text-gray-400 text-sm mt-1 hover:text-blue-600 transition-colors"
                      >
                        +91 7011254007
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        LinkedIn
                      </h4>
                      <a
                        href="https://www.linkedin.com/company/inventis-labs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-gray-400 text-sm mt-1 hover:text-blue-600 transition-colors"
                      >
                        Inventis Labs
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div ref={formRef} className="relative">
            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Send a Message
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  We usually respond within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {status && (
                  <div
                    className={`p-4 rounded-2xl ${status.includes("success") ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"} text-sm font-medium`}
                  >
                    {status}
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-black/40 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all font-medium"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-black/40 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all font-medium"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject"
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-black/40 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all font-medium"
                  />
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your Message"
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-black/40 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all font-medium resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="privacy"
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    I agree to the{" "}
                    <Link
                      to="/privacy-policy"
                      className="underline hover:text-blue-600"
                    >
                      privacy policy
                    </Link>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-8 bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium rounded-full shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
