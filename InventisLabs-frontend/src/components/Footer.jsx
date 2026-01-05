import React, { useState } from "react";
import { Twitter, Linkedin, Facebook, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [privacy, setPrivacy] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!privacy) {
            alert("Please agree to the privacy policy");
            return;
        }

        setStatus("Subscribing...");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/newsletter`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, privacy })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setStatus("Subscribed successfully!");
                setEmail("");
                setPrivacy(false);
            } else {
                setStatus(data.message || "Failed to subscribe");
            }
        } catch {
            setStatus("Network error. Try again.");
        }

        setTimeout(() => setStatus(""), 3000);
    };

    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* ================= GRID ================= */}
                <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

                    {/* ---------- Brand ---------- */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <img
                                src={Logo}
                                alt="InventisLabs Logo"
                                className="h-16 w-auto"
                            />
                            <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight font-display">
                                InventisLabs
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            India's first mass IoT regional earthquake early warning system,
                            protecting lives with advance notification.
                        </p>

                        <div className="flex gap-4 mt-6">
                            {[
                                { Icon: Twitter, href: "#" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/inventis-labs" },
                                { Icon: Facebook, href: "#" },
                                { Icon: Instagram, href: "#" }
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    aria-label="Social link"
                                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ---------- Quick Links ---------- */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", href: "/" },
                                { label: "About Us", href: "/#about" },
                                { label: "Technology", href: "/#technology" },
                                { label: "Coverage", href: "/#coverage" },
                                { label: "Contact", href: "/#contact" }
                            ].map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- Resources ---------- */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6">
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "FAQ", href: "#" },
                                { label: "Teams", to: "/teams" },
                                { label: "Research Papers", href: "#" },
                                { label: "Case Studies", href: "#" },
                                { label: "Press Kit", href: "#" },
                                { label: "Careers", to: "/careers" }
                            ].map((item) => (
                                <li key={item.label}>
                                    {item.to ? (
                                        <Link
                                            to={item.to}
                                            className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---------- Subscribe ---------- */}
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6">
                            Subscribe
                        </h4>
                        <p className="text-sm mb-4">
                            Stay updated with our latest news and developments.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                            <label className="flex gap-2 text-xs cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={privacy}
                                    onChange={(e) => setPrivacy(e.target.checked)}
                                    className="mt-0.5"
                                />
                                <span>
                                    I agree to the{" "}
                                    <Link
                                        to="/privacy-policy"
                                        className="text-blue-600 hover:underline"
                                    >
                                        privacy policy
                                    </Link>
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 text-sm"
                            >
                                {status || "Subscribe"}
                                {!status && <Send className="w-4 h-4" />}
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* ================= BOTTOM BAR ================= */}
            <div className="border-t border-gray-200 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                    <p>© 2026 Inventis Labs. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-blue-600">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
