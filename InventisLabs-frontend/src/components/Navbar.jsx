import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Refs for animations
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuContentRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Navigation Items per requirement
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: "Technology", path: "/technology" },
    { name: "About", path: "/about" },
    { name: "Media & Resources", path: "/media" },
    { name: "Contact / Pilot With Us", path: "/contact" },
  ];

  // Theme toggle logic (persisted)
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  // Update Active State based on Path
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setActive("Home");
    } else if (currentPath.startsWith("/solutions")) {
      setActive("Solutions");
    } else if (currentPath.startsWith("/technology")) {
      setActive("Technology");
    } else if (currentPath.startsWith("/about")) {
      setActive("About");
    } else if (currentPath.startsWith("/media")) {
      setActive("Media & Resources");
    } else if (currentPath.startsWith("/contact")) {
      setActive("Contact / Pilot With Us");
    }
  }, [location.pathname]);

  // Initial Reveal Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        mobileMenuContentRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  }, [isMobileMenuOpen]);

  const handleClick = (e, item) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(item.path);
  };

  return (
    <>
      <div
        ref={navRef}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none opacity-0"
      >
        <nav className="pointer-events-auto flex items-center justify-between p-2 pl-6 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl shadow-black/5 ring-1 ring-black/5 transition-all duration-300 w-full max-w-6xl">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg md:text-xl tracking-tight mr-4 md:mr-8 font-display whitespace-nowrap"
          >
            <span>InventisLabs</span>
            {/* <span className="text-gray-400 font-light">+</span> */}
            {/* <span className="text-blue-600 dark:text-blue-400">EQ-Alert</span> */}
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 p-1 rounded-full">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-xs font-medium transition-all duration-300 rounded-full block tracking-wide cursor-pointer whitespace-nowrap
                                        ${active === item.name
                      ? "text-gray-900 dark:text-white bg-white dark:bg-white/10 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                    }
                                    `}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-4">

            {/* Desktop CTA */}
            <button
              onClick={() => navigate('/contact')}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-95"
            >
              Pilot EQ-Alert
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100/50 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 rounded-full"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[90%] max-w-sm">
        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            navigate('/contact');
          }}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600/90 hover:bg-blue-700 text-white rounded-full font-bold text-sm tracking-wide shadow-xl backdrop-blur-md transition-transform active:scale-95"
        >
          Pilot EQ-Alert <ArrowRight size={16} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[60] bg-[#F5F5F7] dark:bg-black opacity-0 pointer-events-none flex flex-col"
        style={{ transform: "translateY(-100%)" }}
      >
        <div className="flex items-center justify-between p-6 md:p-8">
          <span className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-xl tracking-tight font-display">
            <span>InventisLabs</span>
            <span className="text-gray-400">+</span>
            <span className="text-blue-600 dark:text-blue-400">EQ-Alert</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div
          ref={mobileMenuContentRef}
          className="flex-1 flex flex-col justify-center px-6 md:px-8 space-y-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                navigate(item.path);
              }}
              className={`text-3xl md:text-5xl font-bold tracking-tight py-2 border-b border-gray-100 dark:border-white/5
                                ${active === item.name
                  ? "text-blue-600 dark:text-blue-500"
                  : "text-gray-900 dark:text-white"
                }
                            `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-6 md:p-8 text-sm text-gray-400 font-medium">
          © 2024 Inventis Labs. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Navbar;
