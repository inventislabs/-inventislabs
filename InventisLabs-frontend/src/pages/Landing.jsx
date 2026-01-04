import React from 'react';
import Hero from '../components/Hero';
// import CredibilityStrip from '../components/CredibilityStrip';
import WhatWeDo from '../components/WhatWeDo';

import FeaturedProduct from '../components/FeaturedProduct';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="relative min-h-screen bg-[#F5F5F7] dark:bg-black text-[#1d1d1f] dark:text-white overflow-hidden transition-colors duration-500">
            <main>
                <Hero />

                {/* Scroll Anchor for Solutions */}
                <div id="solutions">
                    <WhatWeDo />
                </div>



                <FeaturedProduct />



                <Contact />

            </main>
            <Footer />
        </div>
    );
};

export default Landing;
