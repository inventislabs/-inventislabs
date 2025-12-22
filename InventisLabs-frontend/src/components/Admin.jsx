import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    Settings,
    Search,
    Bell,
    Trash2,
    Mail,
    Calendar,
    ChevronRight,
    Star,
    Archive,
    Menu,
    LogOut,
    Inbox,
    RefreshCw,
    Shield,
    MoreVertical,
    UserCheck,
    UserMinus,
    Moon,
    Fingerprint,
    X
} from 'lucide-react';

const Admin = () => {
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all'); // all, unread, starred
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

    // Dummy Users Data
    const dummyUsers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' },
        { id: 4, name: 'Dana White', email: 'dana@example.com', role: 'Editor', status: 'Active' },
        { id: 5, name: 'Eve Black', email: 'eve@example.com', role: 'Viewer', status: 'Active' },
        { id: 6, name: 'Frank Green', email: 'frank@example.com', role: 'Editor', status: 'Active' },
        { id: 7, name: 'Grace Hall', email: 'grace@example.com', role: 'Admin', status: 'Active' },
        { id: 8, name: 'Hank Hill', email: 'hank@example.com', role: 'Viewer', status: 'Active' },
        { id: 9, name: 'Ivy Jones', email: 'ivy@example.com', role: 'Editor', status: 'Active' },
        { id: 10, name: 'Jack King', email: 'jack@example.com', role: 'Admin', status: 'Active' },
        { id: 11, name: 'Kelly Lewis', email: 'kelly@example.com', role: 'Viewer', status: 'Active' },
        { id: 12, name: 'Liam Moore', email: 'liam@example.com', role: 'Editor', status: 'Active' },
        { id: 13, name: 'Mia Nelson', email: 'mia@example.com', role: 'Viewer', status: 'Active' },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadMessages = () => {
            const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
            const enrichedMessages = storedMessages.map((msg, index) => ({
                ...msg,
                id: msg.id || index,
                read: msg.read || false,
                starred: msg.starred || false,
                label: msg.label || 'inbox',
                date: msg.date || new Date().toISOString()
            })).sort((a, b) => new Date(b.date) - new Date(a.date));
            setMessages(enrichedMessages);
        };

        loadMessages();
        const interval = setInterval(loadMessages, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && selectedMessage) {
            // Optional: close sidebar when reading message on mobile
        }
    }, [selectedMessage]);


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            const updatedMessages = messages.filter(msg => msg.id !== id);
            setMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            if (selectedMessage?.id === id) setSelectedMessage(null);
        }
    };

    const toggleStar = (e, id) => {
        e.stopPropagation();
        const updatedMessages = messages.map(msg =>
            msg.id === id ? { ...msg, starred: !msg.starred } : msg
        );
        setMessages(updatedMessages);
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        if (selectedMessage?.id === id) {
            setSelectedMessage(prev => ({ ...prev, starred: !prev.starred }));
        }
    };

    const markAsRead = (msg) => {
        if (!msg.read) {
            const updatedMessages = messages.map(m =>
                m.id === msg.id ? { ...m, read: true } : m
            );
            setMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
        }
        setSelectedMessage(msg);
    };

    const filteredMessages = messages.filter(msg => {
        const matchesSearch =
            msg.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.subject?.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedFilter === 'starred') return matchesSearch && msg.starred;
        if (selectedFilter === 'unread') return matchesSearch && !msg.read;
        return matchesSearch;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check session storage for persisting login during session
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // 1. Check Lockout
        const lockoutUntil = localStorage.getItem('lockout_until');
        if (lockoutUntil && Date.now() < parseInt(lockoutUntil)) {
            const timeLeft = Math.ceil((parseInt(lockoutUntil) - Date.now()) / 1000);
            setError(`Too many attempts. Try again in ${timeLeft}s`);
            return;
        }

        // 2. Mock credentials check
        if (loginUsername === 'admin' && loginPassword === 'password') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
            setError('');
            // Reset security counters
            localStorage.removeItem('login_attempts');
            localStorage.removeItem('lockout_until');
        } else {
            // 3. Handle Failed Attempt
            const attempts = parseInt(localStorage.getItem('login_attempts') || '0') + 1;
            localStorage.setItem('login_attempts', attempts.toString());

            if (attempts >= 3) {
                const lockoutTime = Date.now() + 30000; // 30 seconds lockout
                localStorage.setItem('lockout_until', lockoutTime.toString());
                localStorage.removeItem('login_attempts'); // Reset attempts for next cycle
                setError('Too many failed attempts. Locked for 30s.');
            } else {
                setError(`Invalid credentials. ${3 - attempts} attempts remaining.`);
            }
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
    };

    if (!isAuthenticated) {
        return (
            <div className="flex h-screen bg-[#F8FAFC] dark:bg-black items-center justify-center font-display p-4 transition-colors duration-500">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 dark:border-white/10">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl text-white dark:text-black flex items-center justify-center text-3xl font-bold transition-colors">
                            I
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2 transition-colors">Admin Login</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-8 transition-colors">Enter your credentials to access the dashboard</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Username</label>
                            <input
                                type="text"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white text-gray-900 dark:text-white transition-all"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Password</label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white text-gray-900 dark:text-white transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-sm py-2 px-4 rounded-lg text-center font-medium transition-colors">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold hover:bg-gray-900 dark:hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-black/20 dark:shadow-white/10"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || '??';
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden font-display relative transition-colors duration-500">

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative z-30 h-full bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-white/10 transition-all duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
            `}>
                <div className="h-20 flex items-center justify-center border-b border-gray-100 dark:border-white/10 relative">
                    <div className="flex items-center gap-2 font-bold text-xl text-gray-800 dark:text-white transition-colors">
                        <div className="w-8 h-8 bg-black dark:bg-white rounded-lg text-white dark:text-black flex items-center justify-center transition-colors">I</div>
                        {isSidebarOpen && <span>Admin</span>}
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4 space-y-2 flex-1">
                    <button
                        onClick={() => { setSelectedFilter('all'); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${selectedFilter === 'all' ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-gray-200 dark:shadow-none' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                    >
                        <Inbox size={20} />
                        {isSidebarOpen && <span className="font-medium">Inbox</span>}
                        {isSidebarOpen && messages.filter(m => !m.read).length > 0 && selectedFilter !== 'all' && (
                            <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs py-0.5 px-2 rounded-full font-bold">{messages.filter(m => !m.read).length}</span>
                        )}
                    </button>
                    <button
                        onClick={() => { setSelectedFilter('starred'); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${selectedFilter === 'starred' ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-gray-200 dark:shadow-none' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                    >
                        <Star size={20} />
                        {isSidebarOpen && <span className="font-medium">Starred</span>}
                    </button>
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-white/10">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden w-full">

                {/* Header */}
                <header className="h-16 md:h-20 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 md:px-8 shrink-0 transition-colors">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-gray-400 lg:hidden transition-colors">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white capitalize transition-colors">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/20 w-64 transition-all text-gray-900 dark:text-white"
                            />
                        </div>
                        <button className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                            <Search size={20} />
                        </button>
                        <div className="h-8 w-8 bg-gray-200 dark:bg-white/20 rounded-full overflow-hidden border border-gray-300 dark:border-white/10 shrink-0">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Scrollable Area */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                        <div className="bg-white dark:bg-zinc-900 p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none flex items-center gap-4 transition-colors">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl transition-colors">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Total Messages</p>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">{messages.length}</h3>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none flex items-center gap-4 transition-colors">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl transition-colors">
                                <Inbox size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Unread</p>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">{messages.filter(m => !m.read).length}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Content Area - Filling remaining vertical space */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none overflow-hidden flex h-[calc(100vh-280px)] min-h-[500px] animate-fade-in-up transition-colors">

                        {/* List View */}
                        <div className={`${selectedMessage ? 'hidden lg:block w-full lg:w-1/3' : 'w-full'} border-r border-gray-100 dark:border-white/10 flex flex-col transition-colors`}>
                            <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5 transition-colors">
                                <h3 className="font-bold text-gray-700 dark:text-white capitalize transition-colors">{selectedFilter === 'all' ? 'Inbox' : 'Starred'} Messages</h3>
                                <span className="text-xs font-semibold bg-gray-200 dark:bg-white/20 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md transition-colors">{filteredMessages.length}</span>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                {filteredMessages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-40 text-gray-400 dark:text-gray-600 transition-colors">
                                        <Inbox size={40} className="mb-2 opacity-20" />
                                        <p>No messages found</p>
                                    </div>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            onClick={() => markAsRead(msg)}
                                            className={`p-4 border-b border-gray-50 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${selectedMessage?.id === msg.id ? 'bg-blue-50/30 dark:bg-blue-900/20' : ''} ${!msg.read ? 'bg-white dark:bg-zinc-900' : 'bg-gray-50/30 dark:bg-zinc-950/30'}`}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`text-sm truncate pr-2 ${!msg.read ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-400'}`}>
                                                    {msg.fullName}
                                                </h4>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">
                                                    {new Date(msg.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className={`text-xs truncate mb-1 ${!msg.read ? 'text-gray-800 dark:text-gray-300 font-medium' : 'text-gray-500 dark:text-gray-500'}`}>
                                                {msg.subject}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <p className="text-[11px] text-gray-400 dark:text-gray-500 line-clamp-1 max-w-[80%]">
                                                    {msg.message}
                                                </p>
                                                <button onClick={(e) => toggleStar(e, msg.id)} className={`${msg.starred ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400 dark:text-gray-600 dark:hover:text-gray-500'}`}>
                                                    <Star size={14} fill={msg.starred ? "currentColor" : "none"} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Detail View */}
                        <div className={`${!selectedMessage ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-white dark:bg-zinc-900 w-full transition-colors`}>
                            {selectedMessage ? (
                                <>
                                    <div className="p-4 md:p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-start transition-colors">
                                        <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                            {/* Mobile Back Button */}
                                            <button onClick={() => setSelectedMessage(null)} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full shrink-0 transition-colors">
                                                <ChevronRight className="rotate-180 text-gray-600 dark:text-gray-400" size={20} />
                                            </button>

                                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold text-white shadow-sm shrink-0
                                                ${['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500'][selectedMessage.id % 4]}
                                            `}>
                                                {getInitials(selectedMessage.fullName)}
                                            </div>
                                            <div className="min-w-0">
                                                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight truncate transition-colors">{selectedMessage.subject}</h2>
                                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors">
                                                    <span className="font-medium text-gray-900 dark:text-gray-300 truncate">{selectedMessage.fullName}</span>
                                                    <span className="truncate">&lt;{selectedMessage.email}&gt;</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 md:gap-2 shrink-0">
                                            <button onClick={() => handleDelete(selectedMessage.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                            <span className="hidden md:inline text-xs text-gray-400 font-medium self-center ml-2">
                                                {new Date(selectedMessage.date).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-base md:text-lg transition-colors">
                                            {selectedMessage.message}
                                        </p>
                                    </div>
                                    <div className="p-4 md:p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex gap-3 justify-end transition-colors">
                                        <button className="flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 font-medium hover:bg-white dark:hover:bg-white/10 transition-colors bg-white dark:bg-transparent shadow-sm dark:shadow-none text-sm md:text-base">
                                            Reply
                                        </button>
                                        <button className="flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-black/20 dark:shadow-white/10 text-sm md:text-base">
                                            Complete
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-300 dark:text-gray-700 p-8 text-center transition-colors">
                                    <MessageSquare size={64} strokeWidth={1} className="mb-4" />
                                    <p className="text-lg font-medium text-gray-400 dark:text-gray-600">Select a message to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;
