import React from "react";
import Footer from "../components/Footer";

/**
 * Teams / About Inventis Labs page
 * -------------------------------------------------
 * - Hero with headline and description
 * - Quick‑link navigation (same items as Navbar)
 * - Email subscription form
 * - Footer with legal links
 */
const Teams = () => {
    const quickLinks = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Technology", href: "/technology" },
        { label: "Coverage", href: "/coverage" },
        { label: "Contact", href: "/contact" },
        { label: "Resources", href: "/media" },
        { label: "FAQ", href: "#" },
        { label: "Research Papers", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Press Kit", href: "#" },
        { label: "Careers", href: "/careers" },
        { label: "Subscribe", href: "#" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F5F7] dark:bg-zinc-900 transition-colors">
            {/* ==== HERO ==== */}
            <section className="py-24 bg-white dark:bg-black">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        Inventis Labs
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        India’s first mass IoT regional earthquake early warning system, saving lives with advance notification.
                    </p>
                </div>
            </section>

            {/* ==== QUICK LINKS ==== */}
            <section className="py-12 bg-[#F5F5F7] dark:bg-zinc-900">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
                        Quick Links
                    </h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
                        {quickLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="inline-block px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ==== SUBSCRIBE FORM ==== */}
            <section className="py-20 bg-white dark:bg-black">
                <div className="max-w-lg mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Stay updated with our latest news and developments.
                    </h3>
                    <form className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-6">
                        <input
                            type="email"
                            placeholder="Your email"
                            required
                            className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors shadow-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* ==== FOOTER ==== */}
            <Footer />
        </div>
    );
};

export default Teams;
