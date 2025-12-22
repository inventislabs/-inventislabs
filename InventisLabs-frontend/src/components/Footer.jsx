import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                                I
                            </div>
                            <span className="text-xl font-bold font-cursive text-gray-900 dark:text-white tracking-tight transition-colors">Inventis Labs</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs transition-colors">
                            India's first mass IoT regional earthquake early warning system, saving lives with advance notification.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6 transition-colors">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Technology', 'Coverage', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6 transition-colors">Resources</h4>
                        <ul className="space-y-3">
                            {['FAQ', 'Research Papers', 'Case Studies', 'Press Kit', 'Careers'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold mb-6 transition-colors">Subscribe</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors">
                            Stay updated with our latest news and developments.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                            />
                            <div className="flex items-start gap-2">
                                <div className="relative flex items-center mt-0.5">
                                    <input
                                        type="checkbox"
                                        id="privacy-policy"
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 checked:bg-blue-600 checked:border-blue-600 transition-all"
                                    />
                                    <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <label htmlFor="privacy-policy" className="text-xs text-gray-500 dark:text-gray-400 leading-tight cursor-pointer select-none">
                                    I agree to the processing of my personal data according to the <a href="#" className="text-blue-600 hover:text-blue-500 hover:underline">privacy policy</a>.
                                </label>
                            </div>
                            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                                Subscribe
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-gray-500 transition-colors">
                    <p>© 2025 Inventis Labs. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
