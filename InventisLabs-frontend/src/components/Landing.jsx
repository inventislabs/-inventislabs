import React from 'react';
import Hero from './Hero';
import TechBanner from './TechBanner';
import Stats from './Stats';
import About from './About';
import Technology from './Technology';
import Coverage from './Coverage';
import Contact from './Contact';
import Footer from './Footer';

const Landing = () => {
    return (
        <div className="relative min-h-screen bg-[#F5F5F7] dark:bg-black text-[#1d1d1f] dark:text-white overflow-hidden transition-colors duration-500">
            <main>
                <Hero />
                <TechBanner />
                <Stats />
                <About />
                <Technology />
                <Coverage />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
