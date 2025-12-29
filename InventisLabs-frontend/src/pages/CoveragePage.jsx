import React from 'react';
import Coverage from '../components/Coverage';
import Footer from '../components/Footer';

const CoveragePage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display pt-20 transition-colors duration-500">
            {/* Re-using the header style from other pages if desired, or just letting the component handle it. 
                 Since Coverage.jsx has a big padding and header, we might just include it directly. 
                 But let's add a consistent page header wrapper if needed. 
                 However, Coverage.jsx starts with `py-32`, which is plenty of space. 
                 Let's just wrap it.
             */}
            <Coverage />
            <Footer />
        </div>
    );
};

export default CoveragePage;
