import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    Send
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        privacy: false
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.privacy) {
            alert("Please agree to the privacy policy");
            return;
        }

        // 1. Rate Limiting Check
        const lastSubmission = localStorage.getItem('lastSubmissionTime');
        const now = Date.now();
        if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
            const timeLeft = Math.ceil((60000 - (now - parseInt(lastSubmission))) / 1000);
            setStatus(`Rate limit exceeded. Please wait ${timeLeft} seconds.`);
            setTimeout(() => setStatus(''), 5000);
            return;
        }

        // 2. Input Sanitization (Basic XSS Prevention)
        const sanitize = (str) => {
            return str ? str.toString().replace(/[<>]/g, "").trim() : "";
        };

        const cleanedData = {
            fullName: sanitize(formData.fullName),
            email: sanitize(formData.email),
            subject: sanitize(formData.subject),
            message: sanitize(formData.message),
            privacy: formData.privacy
        };

        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const newMessage = {
            ...cleanedData,
            id: Date.now(),
            date: new Date().toISOString()
        };
        localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
        localStorage.setItem('lastSubmissionTime', now.toString()); // Update rate limit

        setStatus('Message sent successfully!');
        setFormData({ fullName: '', email: '', subject: '', message: '', privacy: false });
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section id="contact" className="relative py-24 bg-white dark:bg-black overflow-hidden transition-colors duration-500">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[80px] transition-colors" />
                <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-purple-50/50 dark:bg-purple-900/10 rounded-full blur-[80px] transition-colors" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 transition-colors">
                            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                            Contact Us
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-display leading-tight transition-colors">
                            Let's Build a Safer Future Together
                        </h2>

                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 leading-relaxed transition-colors">
                            Interested in learning more about our earthquake early warning system?
                            Get in touch with our team for demos, partnerships, or general inquiries.
                        </p>

                        <div className="space-y-8">
                            {/* Headquarters */}
                            <div className="flex items-start gap-5">
                                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 transition-colors">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors">Headquarters</h3>
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">
                                        Inventis Labs Pvt. Ltd.<br />
                                        Tech Park, Sector 62<br />
                                        Noida, Uttar Pradesh 201301
                                    </p>
                                </div>
                            </div>

                            {/* Email & Phone Grid */}
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 transition-colors">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors">Email</h3>
                                        <a href="mailto:info@inventislabs.in" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            info@inventislabs.in
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5">
                                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 transition-colors">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors">Phone</h3>
                                        <a href="tel:+911204567890" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            +91 120 4567 890
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex items-start gap-5">
                                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shrink-0 transition-colors">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 transition-colors">Working Hours</h3>
                                    <p className="text-gray-500 dark:text-gray-400 transition-colors">
                                        Monday - Friday: 9 AM - 6 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 transition-colors">
                            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-6 transition-colors">Follow Us</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: Twitter, href: "#", color: "hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400" },
                                    { icon: Linkedin, href: "#", color: "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-500" },
                                    { icon: Facebook, href: "#", color: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-500" },
                                    { icon: Instagram, href: "#", color: "hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:text-pink-500" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 transition-all duration-300 ${social.color} hover:border-transparent hover:scale-110`}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-white/10 transition-colors">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">Send a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {status && (
                                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30 text-sm font-medium transition-colors">
                                        {status}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your name"
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your email"
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="How can we help?"
                                            className="w-full px-6 py-4 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Message</label>
                                    <textarea
                                        rows="4"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Write your message here..."
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20 transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium resize-none"
                                    />
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <div className="flex items-center h-6">
                                        <input
                                            id="privacy"
                                            name="privacy"
                                            type="checkbox"
                                            checked={formData.privacy}
                                            onChange={handleChange}
                                            className="h-5 w-5 rounded border-gray-300 dark:border-white/10 text-blue-600 focus:ring-blue-500/20 dark:bg-white/5"
                                        />
                                    </div>
                                    <label htmlFor="privacy" className="text-sm text-gray-500 dark:text-gray-400 leading-tight transition-colors">
                                        I agree to the processing of my personal data according to the <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">privacy policy</a>.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
                                >
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
