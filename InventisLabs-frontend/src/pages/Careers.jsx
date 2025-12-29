import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Search, MapPin, Clock, Briefcase, ArrowRight, X } from 'lucide-react';

const Careers = () => {
    const containerRef = useRef(null);
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [expandedJobId, setExpandedJobId] = useState(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".careers-header", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Stagger animation for job cards is handled in useEffect when data loads
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/api/jobs`);
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                }
            } catch (error) {
                console.error("Failed to fetch jobs");
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        if (!isLoading && jobs.length > 0) {
            gsap.from(".job-card", {
                y: 50,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "all" // Clear request so hover effects work
            });
        }
    }, [isLoading, jobs]);


    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'All' || job.type === filterType;

        return matchesSearch && matchesType;
    });

    const jobTypes = ['All', ...new Set(jobs.map(j => j.type))];

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-black transition-colors duration-500 font-display pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="careers-header text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wide mb-6">
                        <Briefcase className="w-3 h-3" />
                        <span>Careers</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Join our mission.
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        We're looking for passionate individuals to help us build the future of earthquake early warning technology.
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="careers-header mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by role, location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white transition-all"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto md:pb-0 scrollbar-hide">
                        {jobTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterType === type
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Job List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center py-20 text-gray-400">Loading open positions...</div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10">
                            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No positions found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        filteredJobs.map((job) => {
                            if (job.status === 'Closed') return null; // Don't show closed jobs
                            const isExpanded = expandedJobId === (job._id || job.id);

                            return (
                                <div
                                    key={job._id || job.id}
                                    onClick={() => setExpandedJobId(isExpanded ? null : (job._id || job.id))}
                                    className={`job-card group bg-white dark:bg-zinc-900 border p-6 md:p-8 rounded-2xl flex flex-col gap-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer
                                    ${job.pinned
                                            ? 'border-amber-400/30 shadow-lg shadow-amber-500/5'
                                            : 'border-gray-200 dark:border-white/10 hover:border-blue-500/30'}
                                `}>
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                                                    {job.department}
                                                </span>
                                                {job.jobId && (
                                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                        #{job.jobId}
                                                    </span>
                                                )}
                                                {job.pinned && (
                                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={16} />
                                                    <span>{job.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={16} />
                                                    <span>{job.type}</span>
                                                </div>
                                                {job.experience && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Briefcase size={16} />
                                                        <span>{job.experience}</span>
                                                    </div>
                                                )}
                                                {job.salary && (
                                                    <div className="flex items-center gap-1.5 text-gray-900 dark:text-gray-200 font-medium">
                                                        <span>{job.salary}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <p className={`text-gray-600 dark:text-gray-400 max-w-3xl ${isExpanded ? '' : 'line-clamp-2'}`}>
                                                {job.description}
                                            </p>

                                            {isExpanded && (
                                                <div className="mt-8 space-y-8 animate-fade-in border-t border-gray-100 dark:border-white/5 pt-8">
                                                    {job.responsibilities?.length > 0 && (
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Responsibilities</h4>
                                                            <ul className="list-disc list-outside ml-4 text-gray-600 dark:text-gray-400 space-y-2">
                                                                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {job.requirements?.length > 0 && (
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Requirements</h4>
                                                            <ul className="list-disc list-outside ml-4 text-gray-600 dark:text-gray-400 space-y-2">
                                                                {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    {job.niceToHave?.length > 0 && (
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Nice to Have</h4>
                                                            <ul className="list-disc list-outside ml-4 text-gray-600 dark:text-gray-400 space-y-2">
                                                                {job.niceToHave.map((r, i) => <li key={i}>{r}</li>)}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-4 text-xs text-gray-400 flex items-center gap-2">
                                                {isExpanded ? "Click to collapse" : "Click to view details"}
                                                {job.deadline && <span>• Apply by {new Date(job.deadline).toLocaleDateString()}</span>}
                                            </div>
                                        </div>

                                        <div className="shrink-0 flex flex-col items-end gap-4">
                                            <a
                                                href={`mailto:careers@inventislabs.in?subject=Application for ${job.title}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-sm transition-transform group-hover:scale-105 active:scale-95 whitespace-nowrap"
                                            >
                                                Apply Now <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Empty State / Call to Action */}
                {!isLoading && filteredJobs.length > 0 && (
                    <div className="mt-20 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Don't see a role that fits? <a href="mailto:careers@inventislabs.in" className="text-blue-600 hover:underline">Email us your resume</a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Careers;
