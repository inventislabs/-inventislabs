import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyNotice = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent === null) {
            // Small delay for entrance animation
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 z-50 flex justify-center pointer-events-none">
            <div className="w-full max-w-4xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/10 rounded-2xl p-6 md:p-6 flex flex-col md:flex-row items-center gap-6 pointer-events-auto transform transition-all duration-500 animate-[slideUp_0.5s_ease-out]">

                <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-xl shrink-0 hidden md:block">
                    <Cookie className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">We value your privacy</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        We use cookies to improve your experience and analyze site traffic.
                        By opting in, you agree to our
                        <Link to="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline mx-1 font-medium">Cookie Policy</Link>.
                    </p>
                </div>

                <div className="flex flex-row gap-3 w-full md:w-auto shrink-0 justify-center">
                    <button
                        onClick={handleDecline}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm w-full md:w-auto"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all text-sm whitespace-nowrap w-full md:w-auto"
                    >
                        Accept Cookies
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyNotice;
