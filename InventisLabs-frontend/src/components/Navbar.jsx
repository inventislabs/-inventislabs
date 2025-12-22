import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Moon, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const [active, setActive] = useState('Home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Theme toggle logic
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    // Update active based on scroll or path
    useEffect(() => {
        if (location.pathname === '/') {
            const handleScroll = () => {
                const sections = ['about', 'technology', 'coverage', 'contact'];
                let current = 'Home';

                // Check if at top
                if (window.scrollY < 100) {
                    setActive('Home');
                    return;
                }

                for (const section of sections) {
                    const el = document.getElementById(section);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 200 && rect.bottom >= 200) {
                            current = section.charAt(0).toUpperCase() + section.slice(1);
                        }
                    }
                }
                setActive(current);
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        } else {
            // For other routes, active state logic is simple or unset
            setActive('');
        }
    }, [location.pathname]);

    // GSAP Entrance Animation
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
            );
        });
        return () => ctx.revert();
    }, []);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Technology', path: '/technology' },
        { name: 'Coverage', path: '/coverage' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleClick = (e, item) => {
        e.preventDefault();

        // Mobile closing logic
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);

        setActive(item.name);

        const targetId = item.name.toLowerCase();

        if (item.name === 'Home') {
            if (location.pathname !== '/') {
                navigate('/');
                // Need to wait for navigation then scroll to top
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        const scrollToSection = () => {
            const element = document.getElementById(targetId);
            if (element) {
                gsap.to(window, { duration: 1, scrollTo: { y: element, offsetY: 100 }, ease: "power2.out" });
            }
        };

        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete before scrolling
            setTimeout(scrollToSection, 500);
        } else {
            scrollToSection();
        }
    };

    const handleHover = (e) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    };

    const handleHoverExit = (e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power1.out" });
    };

    return (
        <>
            <div ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[800px] pointer-events-none opacity-0">
                <nav className="pointer-events-auto flex items-center justify-between pl-6 pr-2 py-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-300">

                    {/* Brand */}
                    <div className="flex-shrink-0 cursor-pointer group mr-8">
                        <Link to="/" onClick={(e) => handleClick(e, { name: 'Home' })} className="text-gray-900 dark:text-gray-100 font-bold text-2xl tracking-wide transition-colors group-hover:text-black dark:group-hover:text-white font-cursive">
                            Inventis Labs
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.path}
                                    onClick={(e) => handleClick(e, item)}
                                    onMouseEnter={handleHover}
                                    onMouseLeave={handleHoverExit}
                                    className={`relative px-5 py-2.5 text-xs font-semibold transition-all duration-300 rounded-full block tracking-wide cursor-pointer
                                        ${active === item.name
                                            ? 'text-white bg-black dark:bg-white dark:text-black shadow-lg shadow-black/10'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10'
                                        }
                                    `}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle Button (Desktop) */}
                    <button
                        onClick={toggleTheme}
                        className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-gray-100 hover:scale-105 transition-all ml-4"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Mobile Menu Button | Desktop Placeholder */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none bg-gray-100/50 dark:bg-white/10 rounded-full hover:bg-gray-100 dark:hover:bg-white/20 transition-colors"
                            aria-label="Open Menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl transition-all duration-500 transform ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between mb-12 mt-2">
                        <span className="text-gray-900 dark:text-white font-bold text-3xl tracking-wide font-cursive">
                            Inventis Labs
                        </span>

                        <div className="flex items-center gap-4">
                            {/* Theme Toggle Button (Mobile) */}
                            <button
                                onClick={toggleTheme}
                                className="p-3 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-3 -mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                aria-label="Close Menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Links */}
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                            <li key={item.name}
                                style={{
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.05}s`
                                }}
                            >
                                <a
                                    href={item.path}
                                    onClick={(e) => handleClick(e, item)}
                                    className={`block text-3xl font-semibold tracking-tight
                                        ${active === item.name
                                            ? 'text-black dark:text-white'
                                            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                                        }
                                    `}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto mb-8 text-sm text-gray-400 font-medium">
                        © 2024 Inventis Labs
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
