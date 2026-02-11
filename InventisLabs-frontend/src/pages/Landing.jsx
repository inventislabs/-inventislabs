import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
// import CredibilityStrip from '../components/CredibilityStrip';
import WhatWeDo from '../components/WhatWeDo';

import FeaturedProduct from '../components/FeaturedProduct';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="relative min-h-screen bg-[#F5F5F7] dark:bg-black text-[#1d1d1f] dark:text-white overflow-hidden transition-colors duration-500">
            <SEO
                title="No 1 Earthquake System & Structural Health Solutions | Inventis Labs"
                description="Inventis Labs provides the world's most advanced earthquake alert and structural monitoring systems. Protect your infrastructure with real-time data."
                keywords="earthquake system, structural health monitoring, seismic alert, inventis labs, earthquake sensor"
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Inventis Labs",
                        "url": "https://inventislabs.com",
                        "description": "Provider of advanced earthquake alert and structural monitoring systems."
                    })}
                </script>
            </SEO>
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
