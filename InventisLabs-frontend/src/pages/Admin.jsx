import React, { useState, useEffect } from 'react';
import {
    Users, MessageSquare, Star, Trash2, LogOut, ChevronRight,
    Search, Inbox, Archive, Briefcase, Plus, MapPin, Clock, MoreHorizontal, Edit,
    Package, Download, Eye, EyeOff, Image, FileText, Upload
} from 'lucide-react';

const Admin = () => {
    // --- State ---
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [selectedTab, setSelectedTab] = useState('inbox'); // 'inbox', 'starred', 'jobs', 'presskit'
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showForwardForm, setShowForwardForm] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [forwardEmail, setForwardEmail] = useState('');
    const [forwardMessage, setForwardMessage] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);

    // --- Env & Fetch ---
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Helper to get auth headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem('adminToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const loadMessages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/admin/messages`, {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const response = await res.json();
                // Normalize data
                const enriched = (response.data || []).map(m => ({
                    ...m,
                    read: m.read || false,
                    starred: m.starred || false,
                    date: m.date || new Date().toISOString()
                })).sort((a, b) => new Date(b.date) - new Date(a.date));
                setMessages(enriched);
            } else if (res.status === 401) {
                // Token expired or invalid
                handleLogout();
            }
        } catch (e) {
            console.error("Failed to load messages", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadMessages();
            const interval = setInterval(loadMessages, 15000); // Poll slower
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    // --- Actions ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoading(true);

        try {
            const res = await fetch(`${apiUrl}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                localStorage.setItem('adminToken', data.token);
                setIsAuthenticated(true);
                setPassword('');
                setUsername('');
            } else {
                setLoginError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('Connection error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setPassword('');
        setUsername('');
    };

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation();
        if (!confirm('Delete this item?')) return;

        // Optimistic
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);

        try {
            await fetch(`${apiUrl}/api/admin/messages/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
        } catch (error) {
            console.error(error);
            loadMessages(); // Revert on error
        }
    };

    const toggleStar = async (e, id) => {
        e.stopPropagation();
        const msg = messages.find(m => m.id === id);
        if (!msg) return;

        const newStatus = !msg.starred;
        setMessages(prev => prev.map(m => m.id === id ? { ...m, starred: newStatus } : m));
        if (selectedMessage?.id === id) setSelectedMessage({ ...selectedMessage, starred: newStatus });

        try {
            await fetch(`${apiUrl}/api/admin/messages/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ starred: newStatus })
            });
        } catch (error) { console.error(error); }
    };

    const markAsRead = async (msg) => {
        setSelectedMessage(msg);
        loadConversationHistory(msg.id);
        if (!msg.read) {
            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
            try {
                await fetch(`${apiUrl}/api/admin/messages/${msg.id}`, {
                    method: 'PATCH',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({ read: true })
                });
            } catch (error) { console.error(error); }
        }
    };

    const loadConversationHistory = async (messageId) => {
        try {
            const res = await fetch(`${apiUrl}/api/admin/messages/${messageId}/history`, {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const response = await res.json();
                setConversationHistory(response.data || []);
            }
        } catch (error) {
            console.error('Failed to load conversation history:', error);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!selectedMessage || !replyMessage.trim()) return;

        setSendingEmail(true);
        try {
            const res = await fetch(`${apiUrl}/api/admin/reply`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    to: selectedMessage.email,
                    subject: `Re: ${selectedMessage.subject}`,
                    message: replyMessage,
                    originalMessage: selectedMessage.message,
                    recipientName: selectedMessage.fullName,
                    contactId: selectedMessage.id
                })
            });

            if (res.ok) {
                alert('Reply sent successfully!');
                setReplyMessage('');
                setShowReplyForm(false);
                // Reload conversation history
                loadConversationHistory(selectedMessage.id);
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to send reply');
            }
        } catch (error) {
            console.error('Reply error:', error);
            alert('Failed to send reply. Please try again.');
        } finally {
            setSendingEmail(false);
        }
    };

    const handleForward = async (e) => {
        e.preventDefault();
        if (!selectedMessage || !forwardEmail.trim()) return;

        setSendingEmail(true);
        try {
            const res = await fetch(`${apiUrl}/api/admin/forward`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    to: forwardEmail,
                    subject: `Fwd: ${selectedMessage.subject}`,
                    message: forwardMessage || '',
                    originalMessage: selectedMessage.message,
                    originalSender: selectedMessage.fullName,
                    originalEmail: selectedMessage.email,
                    contactId: selectedMessage.id
                })
            });

            if (res.ok) {
                alert('Message forwarded successfully!');
                setForwardEmail('');
                setForwardMessage('');
                setShowForwardForm(false);
                // Reload conversation history
                loadConversationHistory(selectedMessage.id);
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to forward message');
            }
        } catch (error) {
            console.error('Forward error:', error);
            alert('Failed to forward message. Please try again.');
        } finally {
            setSendingEmail(false);
        }
    };

    // --- Filtering ---
    const filteredMessages = messages.filter(msg => {
        if (selectedTab === 'starred' && !msg.starred) return false;
        if (selectedTab === 'jobs') return false; // Jobs handled separately

        const query = searchQuery.toLowerCase();
        return msg.fullName.toLowerCase().includes(query) ||
            msg.subject.toLowerCase().includes(query) ||
            msg.email.toLowerCase().includes(query);
    });

    // --- Render Login ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] dark:bg-black font-display p-4">
                <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-white/10">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl mx-auto flex items-center justify-center mb-4">
                            <span className="text-white dark:text-black font-bold text-xl">IL</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
                        <p className="text-gray-500 text-sm mt-2">Inventis Labs Internal System</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {loginError && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                                {loginError}
                            </div>
                        )}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-gray-900 dark:text-white"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-5 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-gray-900 dark:text-white"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // --- Render Dashboard ---
    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-black font-display flex overflow-hidden">

            {/* Sidebar */}
            <aside className="w-20 lg:w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-white/10 flex flex-col shrink-0 transition-all duration-300 z-20">
                <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-100 dark:border-white/5">
                    <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-white dark:text-black font-bold text-sm">IL</span>
                    </div>
                    <span className="hidden lg:block ml-4 font-bold text-lg text-gray-900 dark:text-white">Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <SidebarItem
                        icon={<Inbox size={20} />}
                        label="Inbox"
                        active={selectedTab === 'inbox'}
                        onClick={() => { setSelectedTab('inbox'); setSelectedMessage(null); }}
                        badge={messages.filter(m => !m.read).length}
                    />
                    <SidebarItem
                        icon={<Star size={20} />}
                        label="Starred"
                        active={selectedTab === 'starred'}
                        onClick={() => { setSelectedTab('starred'); setSelectedMessage(null); }}
                    />
                    <div className="h-px bg-gray-200 dark:bg-white/10 my-4 mx-2" />
                    <SidebarItem
                        icon={<Briefcase size={20} />}
                        label="Jobs"
                        active={selectedTab === 'jobs'}
                        onClick={() => { setSelectedTab('jobs'); setSelectedMessage(null); }}
                    />
                    {/* <SidebarItem
                        icon={<Package size={20} />}
                        label="Press Kit"
                        active={selectedTab === 'presskit'}
                        onClick={() => { setSelectedTab('presskit'); setSelectedMessage(null); }}
                    /> */}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center lg:justify-start gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                        <LogOut size={20} />
                        <span className="hidden lg:inline font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 lg:px-8 z-10 sticky top-0">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                        {selectedTab}
                    </h2>

                    <div className="flex items-center gap-4">
                        {selectedTab !== 'jobs' && (
                            <div className="relative hidden md:block group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-black border focus:border-blue-500/50 rounded-xl text-sm w-64 transition-all outline-none"
                                />
                            </div>
                        )}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white dark:bg-black flex items-center justify-center overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Admin" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-hidden relative">
                    {selectedTab === 'jobs' ? (
                        <JobsManager apiUrl={apiUrl} />
                    ) : selectedTab === 'presskit' ? (
                        <PressKitManager apiUrl={apiUrl} />
                    ) : (
                        <div className="h-full flex">
                            {/* Message List */}
                            <div className={`${selectedMessage ? 'hidden lg:flex' : 'flex'} w-full lg:w-[400px] xl:w-[450px] flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden`}>
                                <div className="flex-1 overflow-y-auto scrollbar-hide">
                                    {filteredMessages.length === 0 ? (
                                        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                                            <Inbox size={48} strokeWidth={1} className="mb-4 opacity-50" />
                                            <p>No messages found</p>
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-100 dark:divide-white/5">
                                            {filteredMessages.map(msg => (
                                                <li
                                                    key={msg.id}
                                                    onClick={() => markAsRead(msg)}
                                                    className={`
                                                        p-5 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-white/5 relative
                                                        ${selectedMessage?.id === msg.id ? 'bg-blue-50 dark:bg-blue-900/10 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500' : ''}
                                                        ${!msg.read ? 'bg-gray-50/50 dark:bg-white/[0.02]' : ''}
                                                    `}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                            {!msg.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
                                                            <h4 className={`truncate ${!msg.read ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-300'}`}>
                                                                {msg.fullName}
                                                            </h4>
                                                        </div>
                                                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                            {new Date(msg.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                    <p className={`text-sm tracking-tight mb-2 truncate ${!msg.read ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                                                        {msg.subject}
                                                    </p>
                                                    <div className="flex justify-between items-end">
                                                        <p className="text-xs text-gray-400 line-clamp-2 max-w-[85%]">
                                                            {msg.message}
                                                        </p>
                                                        <button
                                                            onClick={(e) => toggleStar(e, msg.id)}
                                                            className={`p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${msg.starred ? 'text-amber-400' : 'text-gray-300'}`}
                                                        >
                                                            <Star size={16} fill={msg.starred ? "currentColor" : "none"} />
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Message Detail View */}
                            <div className={`flex-1 flex-col bg-[#f5f5f7] dark:bg-black overflow-hidden ${selectedMessage ? 'flex' : 'hidden lg:flex'}`}>
                                {selectedMessage ? (
                                    <div className="h-full overflow-y-auto p-4 lg:p-8">
                                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 min-h-full flex flex-col">
                                            {/* Toolbar */}
                                            <div className="p-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur rounded-t-2xl z-10">
                                                <button onClick={() => setSelectedMessage(null)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                                                    <ChevronRight className="rotate-180" size={20} />
                                                </button>
                                                <div className="flex items-center gap-2 ml-auto">
                                                    <button onClick={(e) => toggleStar(e, selectedMessage.id)} className="p-2 text-gray-400 hover:text-amber-400 hover:bg-amber-50 rounded-lg transition-colors" title="Star">
                                                        <Star size={18} fill={selectedMessage.starred ? "currentColor" : "none"} />
                                                    </button>
                                                    <button onClick={() => handleDelete(selectedMessage.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 lg:p-10 flex-1 overflow-y-auto">
                                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                                    {selectedMessage.subject}
                                                </h1>

                                                {/* Conversation Thread */}
                                                <div className="space-y-6">
                                                    {conversationHistory.length > 0 ? (
                                                        conversationHistory.map((item, index) => (
                                                            <div key={item.id || index} className={`${item.type === 'incoming' ? 'bg-white dark:bg-zinc-800' : 'bg-blue-50 dark:bg-blue-900/20'} rounded-2xl p-6 border ${item.type === 'incoming' ? 'border-gray-200 dark:border-white/10' : 'border-blue-200 dark:border-blue-800/30'}`}>
                                                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md
                                                                            ${item.type === 'incoming' ? 'bg-purple-500' : 'bg-blue-600'}
                                                                        `}>
                                                                            {item.type === 'incoming' ? item.from?.charAt(0) : 'A'}
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                                                                                {item.type === 'incoming' ? item.from : item.sentBy || 'Admin'}
                                                                            </h3>
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                                {item.type === 'incoming' ? (
                                                                                    <a href={`mailto:${item.email}`} className="hover:underline hover:text-blue-500">{item.email}</a>
                                                                                ) : (
                                                                                    `To: ${item.to}`
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-xs font-medium text-gray-900 dark:text-white">
                                                                            {new Date(item.date).toLocaleDateString()}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="prose dark:prose-invert max-w-none text-black dark:text-white leading-relaxed">
                                                                    {item.message.split('\n').map((line, i) => (
                                                                        <p key={i} className="mb-2 text-sm">{line}</p>
                                                                    ))}
                                                                </div>
                                                                {item.type === 'forwarded' && (
                                                                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10">
                                                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Forwarded Message</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        // Fallback to original message if no history loaded
                                                        <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
                                                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md
                                                                        ${['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500'][selectedMessage.id % 4]}
                                                                    `}>
                                                                        {selectedMessage.fullName.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selectedMessage.fullName}</h3>
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                            &lt;<a href={`mailto:${selectedMessage.email}`} className="hover:underline hover:text-blue-500">{selectedMessage.email}</a>&gt;
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {new Date(selectedMessage.date).toLocaleDateString()}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {new Date(selectedMessage.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="prose dark:prose-invert max-w-none text-black dark:text-white leading-relaxed text-lg">
                                                                {selectedMessage.message.split('\n').map((line, i) => (
                                                                    <p key={i} className="mb-4">{line}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Reply Area */}
                                            <div className="p-6 lg:p-8 bg-gray-50 dark:bg-white/5 rounded-b-2xl border-t border-gray-100 dark:border-white/5 mt-auto">
                                                {!showReplyForm && !showForwardForm ? (
                                                    <div className="flex gap-4">
                                                        <button
                                                            onClick={() => {
                                                                setShowReplyForm(true);
                                                                setShowForwardForm(false);
                                                            }}
                                                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-xl font-medium shadow-sm hover:shadow-md transition-all text-sm"
                                                        >
                                                            Reply
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setShowForwardForm(true);
                                                                setShowReplyForm(false);
                                                            }}
                                                            className="px-6 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:shadow-md transition-all text-sm"
                                                        >
                                                            Forward
                                                        </button>
                                                    </div>
                                                ) : showReplyForm ? (
                                                    <form onSubmit={handleReply} className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                                Reply to: {selectedMessage.fullName} ({selectedMessage.email})
                                                            </label>
                                                            <textarea
                                                                value={replyMessage}
                                                                onChange={(e) => setReplyMessage(e.target.value)}
                                                                placeholder="Type your reply here..."
                                                                required
                                                                rows="6"
                                                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all resize-none"
                                                            />
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                type="submit"
                                                                disabled={sendingEmail}
                                                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {sendingEmail ? 'Sending...' : 'Send Reply'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowReplyForm(false);
                                                                    setReplyMessage('');
                                                                }}
                                                                className="px-6 py-2.5 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium shadow-sm hover:shadow-md transition-all text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <form onSubmit={handleForward} className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                                Forward to:
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={forwardEmail}
                                                                onChange={(e) => setForwardEmail(e.target.value)}
                                                                placeholder="recipient@example.com"
                                                                required
                                                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all mb-3"
                                                            />
                                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                                Add a message (optional):
                                                            </label>
                                                            <textarea
                                                                value={forwardMessage}
                                                                onChange={(e) => setForwardMessage(e.target.value)}
                                                                placeholder="Add a note to the forwarded message..."
                                                                rows="4"
                                                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all resize-none"
                                                            />
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button
                                                                type="submit"
                                                                disabled={sendingEmail}
                                                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {sendingEmail ? 'Forwarding...' : 'Forward Message'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowForwardForm(false);
                                                                    setForwardEmail('');
                                                                    setForwardMessage('');
                                                                }}
                                                                className="px-6 py-2.5 bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium shadow-sm hover:shadow-md transition-all text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                                        <div className="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mb-6">
                                            <Archive size={32} className="text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Message Selected</h3>
                                        <p className="text-gray-500 max-w-xs">Select a message from the list to view its details here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// --- Sub Components ---

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
    <button
        onClick={onClick}
        className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
            ${active
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/5'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
            }
        `}
    >
        <span className={active ? 'text-white dark:text-black' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}>
            {icon}
        </span>
        <span className="hidden lg:block font-medium">{label}</span>
        {badge > 0 && (
            <span className={`
                hidden lg:flex ml-auto text-xs font-bold px-2 py-0.5 rounded-full
                ${active ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'}
            `}>
                {badge}
            </span>
        )}
    </button>
);

const JobsManager = ({ apiUrl }) => {
    const [jobs, setJobs] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editJobId, setEditJobId] = useState(null);
    const [formData, setFormData] = useState({
        title: '', location: '', type: 'Full-time', department: '', description: '',
        salary: '', experience: '', deadline: '', jobId: '',
        responsibilities: '', requirements: '', niceToHave: ''
    });

    // Helper to get auth headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem('adminToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    useEffect(() => {
        fetch(`${apiUrl}/api/jobs`).then(r => r.json()).then(setJobs).catch(console.error);
    }, [apiUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                responsibilities: formData.responsibilities.split('\n').filter(i => i.trim()),
                requirements: formData.requirements.split('\n').filter(i => i.trim()),
                niceToHave: formData.niceToHave.split('\n').filter(i => i.trim())
            };

            const method = editJobId ? 'PATCH' : 'POST';
            const url = editJobId ? `${apiUrl}/api/admin/jobs/${editJobId}` : `${apiUrl}/api/admin/jobs`;

            await fetch(url, {
                method: method,
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });
            setIsFormOpen(false);
            setEditJobId(null);
            setFormData({
                title: '', location: '', type: 'Full-time', department: '', description: '',
                salary: '', experience: '', deadline: '', jobId: '',
                responsibilities: '', requirements: '', niceToHave: ''
            });
            fetch(`${apiUrl}/api/jobs`).then(r => r.json()).then(setJobs);
        } catch (error) { console.error(error); }
    };

    const handleEdit = (job, e) => {
        if (e) e.stopPropagation();
        setEditJobId(job._id || job.id);
        setFormData({
            title: job.title,
            location: job.location,
            type: job.type,
            department: job.department,
            description: job.description,
            salary: job.salary || '',
            experience: job.experience || '',
            deadline: job.deadline ? job.deadline.split('T')[0] : '',
            jobId: job.jobId || '',
            responsibilities: job.responsibilities ? job.responsibilities.join('\n') : '',
            requirements: job.requirements ? job.requirements.join('\n') : '',
            niceToHave: job.niceToHave ? job.niceToHave.join('\n') : ''
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation();
        if (!confirm('Delete Job?')) return;
        await fetch(`${apiUrl}/api/admin/jobs/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        setJobs(prev => prev.filter(j => (j._id || j.id) !== id));
    };

    const togglePin = async (id, currentPinned, e) => {
        if (e) e.stopPropagation();
        const newPinned = !currentPinned;
        // Optimistic
        setJobs(prev => prev.map(j => (j._id || j.id) === id ? { ...j, pinned: newPinned } : j));

        await fetch(`${apiUrl}/api/admin/jobs/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ pinned: newPinned })
        });
    };

    const toggleStatus = async (id, currentStatus, e) => {
        if (e) e.stopPropagation();
        const newStatus = currentStatus === 'Open' ? 'Closed' : 'Open';
        // Optimistic
        setJobs(prev => prev.map(j => (j._id || j.id) === id ? { ...j, status: newStatus } : j));

        await fetch(`${apiUrl}/api/admin/jobs/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status: newStatus })
        });
    };

    return (
        <div className="h-full overflow-y-auto p-4 lg:p-8">
            {/* Jobs Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Job Listings</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage open positions and opportunities.</p>
                </div>
                <button
                    onClick={() => {
                        setEditJobId(null);
                        setFormData({
                            title: '', location: '', type: 'Full-time', department: '', description: '',
                            salary: '', experience: '', deadline: '', jobId: '',
                            responsibilities: '', requirements: '', niceToHave: ''
                        });
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-medium hover:scale-105 transition-transform shadow-lg"
                >
                    <Plus size={18} />
                    Post New Job
                </button>
            </div>

            {/* Job Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobs.map(job => (
                    <div key={job._id || job.id} className={`group bg-white dark:bg-zinc-900 p-6 rounded-2xl border transition-all duration-300 relative
                        ${job.pinned ? 'border-amber-400/50 shadow-lg shadow-amber-500/10' : 'border-gray-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5'}
                        ${job.status === 'Closed' ? 'opacity-70' : ''}
                    `}>
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => togglePin(job._id || job.id, job.pinned, e)}
                                className={`p-2 rounded-lg transition-colors ${job.pinned ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'}`}
                                title={job.pinned ? "Unpin" : "Pin to top"}
                            >
                                <Star size={16} fill={job.pinned ? "currentColor" : "none"} />
                            </button>
                            <button
                                onClick={(e) => handleEdit(job, e)}
                                className="p-2 text-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40"
                                title="Edit"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={(e) => handleDelete(job._id || job.id, e)}
                                className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <Briefcase size={24} />
                            </div>
                            {job.status === 'Closed' && (
                                <span className="bg-gray-100 dark:bg-white/10 text-gray-500 text-xs font-bold px-2 py-1 rounded">CLOSED</span>
                            )}
                        </div>

                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">{job.title}</h3>
                        <p className="text-sm font-medium text-gray-500 mb-4">{job.salary || 'Salary not specified'}</p>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Users size={14} />
                                <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin size={14} />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <Clock size={14} />
                                <span>{job.type} • {job.experience || 'Exp N/A'}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                            <span className="text-xs font-medium text-gray-400">
                                {job.deadline ? `Apply by ${new Date(job.deadline).toLocaleDateString()}` : `Posted ${new Date(job.postedDate || Date.now()).toLocaleDateString()}`}
                            </span>
                            <button
                                onClick={(e) => toggleStatus(job._id || job.id, job.status, e)}
                                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${job.status === 'Open'
                                    ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100'
                                    : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/10 hover:bg-gray-200'
                                    }`}
                            >
                                {job.status === 'Open' ? 'Active' : 'Re-open'}
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <button
                    onClick={() => {
                        setEditJobId(null);
                        setFormData({
                            title: '', location: '', type: 'Full-time', department: '', description: '',
                            salary: '', experience: '', deadline: '', jobId: '',
                            responsibilities: '', requirements: '', niceToHave: ''
                        });
                        setIsFormOpen(true);
                    }}
                    className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/5 transition-all min-h-[250px] group"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 group-hover:scale-110 transition-transform flex items-center justify-center mb-4">
                        <Plus size={32} />
                    </div>
                    <span className="font-medium">Create New Listing</span>
                </button>
            </div>

            {/* Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl p-8 shadow-2xl border border-gray-100 dark:border-white/10 transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{editJobId ? 'Edit Position' : 'New Position'}</h3>
                                <p className="text-gray-500 text-sm">{editJobId ? 'Update job details.' : 'Create a new job opportunity.'}</p>
                            </div>
                            <button onClick={() => setIsFormOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 dark:text-white">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Job Title</label>
                                    <input required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all font-medium" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Senior Product Designer" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Job ID</label>
                                    <input required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all font-medium" value={formData.jobId} onChange={e => setFormData({ ...formData, jobId: e.target.value })} placeholder="e.g. ENG-001" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Location</label>
                                    <input required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Remote, India" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Department</label>
                                    <input required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} placeholder="e.g. Design" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Type</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all appearance-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Experience</label>
                                    <input required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} placeholder="e.g. 3-5 Years" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Salary Range</label>
                                    <input className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} placeholder="e.g. $100k - $140k" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Deadline</label>
                                    <input type="date" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description</label>
                                <textarea required rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Role requirements and details..." />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Responsibilities (One per line)</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.responsibilities} onChange={e => setFormData({ ...formData, responsibilities: e.target.value })} placeholder="- Develop features..." />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Requirements (One per line)</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })} placeholder="- React.js..." />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Nice to Have (One per line)</label>
                                <textarea rows="3" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all" value={formData.niceToHave} onChange={e => setFormData({ ...formData, niceToHave: e.target.value })} placeholder="- Startup experience..." />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-blue-500/30">
                                {editJobId ? 'Update Position' : 'Publish Position'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Press Kit Manager Component
const PressKitManager = ({ apiUrl }) => {
    const [items, setItems] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [formData, setFormData] = useState({
        category: 'logo',
        title: '',
        description: '',
        fileUrl: '',
        fileName: '',
        fileType: '',
        fileSize: 0,
        thumbnailUrl: '',
        tags: '',
        isPublic: true,
        featured: false,
        metadata: {
            dimensions: '',
            format: '',
            colorMode: '',
            version: ''
        }
    });

    const categories = [
        { value: 'logo', label: 'Logos', icon: <Image size={16} /> },
        { value: 'brand-assets', label: 'Brand Assets', icon: <Package size={16} /> },
        { value: 'media', label: 'Media', icon: <FileText size={16} /> },
        { value: 'documents', label: 'Documents', icon: <FileText size={16} /> },
        { value: 'screenshots', label: 'Screenshots', icon: <Image size={16} /> },
        { value: 'other', label: 'Other', icon: <Package size={16} /> }
    ];

    const getAuthHeaders = () => {
        const token = localStorage.getItem('adminToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/admin/presskit`, {
                headers: getAuthHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                setItems(data.data || []);
            }
        } catch (error) {
            console.error('Failed to load press kit items:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clean up the payload - remove empty strings
            const payload = {
                category: formData.category,
                title: formData.title,
                description: formData.description,
                fileUrl: formData.fileUrl,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                isPublic: formData.isPublic,
                featured: formData.featured
            };

            // Add optional fields only if they have values
            if (formData.fileName) payload.fileName = formData.fileName;
            if (formData.fileType) payload.fileType = formData.fileType;
            if (formData.fileSize) payload.fileSize = parseInt(formData.fileSize);
            if (formData.thumbnailUrl) payload.thumbnailUrl = formData.thumbnailUrl;

            // Add metadata only if at least one field has a value
            const metadata = {};
            if (formData.metadata.dimensions) metadata.dimensions = formData.metadata.dimensions;
            if (formData.metadata.format) metadata.format = formData.metadata.format;
            if (formData.metadata.colorMode) metadata.colorMode = formData.metadata.colorMode;
            if (formData.metadata.version) metadata.version = formData.metadata.version;

            if (Object.keys(metadata).length > 0) {
                payload.metadata = metadata;
            }

            console.log('Sending payload:', payload);

            const method = editItemId ? 'PATCH' : 'POST';
            const url = editItemId
                ? `${apiUrl}/api/admin/presskit/${editItemId}`
                : `${apiUrl}/api/admin/presskit`;

            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsFormOpen(false);
                setEditItemId(null);
                resetForm();
                loadItems();
            } else {
                const errorData = await res.json();
                console.error('Server error:', errorData);
                alert(`Error: ${errorData.message || 'Failed to save press kit item'}`);
            }
        } catch (error) {
            console.error('Failed to save press kit item:', error);
            alert('Failed to save press kit item. Please check the console for details.');
        }
    };

    const handleEdit = (item) => {
        setEditItemId(item._id);
        setFormData({
            category: item.category,
            title: item.title,
            description: item.description,
            fileUrl: item.fileUrl,
            fileName: item.fileName,
            fileType: item.fileType,
            fileSize: item.fileSize,
            thumbnailUrl: item.thumbnailUrl || '',
            tags: item.tags?.join(', ') || '',
            isPublic: item.isPublic,
            featured: item.featured,
            metadata: item.metadata || {
                dimensions: '',
                format: '',
                colorMode: '',
                version: ''
            }
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this press kit item?')) return;

        try {
            await fetch(`${apiUrl}/api/admin/presskit/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            setItems(prev => prev.filter(item => item._id !== id));
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const toggleVisibility = async (id, currentStatus) => {
        try {
            await fetch(`${apiUrl}/api/admin/presskit/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ isPublic: !currentStatus })
            });
            setItems(prev => prev.map(item =>
                item._id === id ? { ...item, isPublic: !currentStatus } : item
            ));
        } catch (error) {
            console.error('Failed to toggle visibility:', error);
        }
    };

    const toggleFeatured = async (id, currentStatus) => {
        try {
            await fetch(`${apiUrl}/api/admin/presskit/${id}`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
                body: JSON.stringify({ featured: !currentStatus })
            });
            setItems(prev => prev.map(item =>
                item._id === id ? { ...item, featured: !currentStatus } : item
            ));
        } catch (error) {
            console.error('Failed to toggle featured:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            category: 'logo',
            title: '',
            description: '',
            fileUrl: '',
            fileName: '',
            fileType: '',
            fileSize: 0,
            thumbnailUrl: '',
            tags: '',
            isPublic: true,
            featured: false,
            metadata: {
                dimensions: '',
                format: '',
                colorMode: '',
                version: ''
            }
        });
    };

    const filteredItems = filterCategory === 'all'
        ? items
        : items.filter(item => item.category === filterCategory);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="h-full overflow-y-auto p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Press Kit</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage brand assets, logos, and media files.</p>
                </div>
                <button
                    onClick={() => {
                        setEditItemId(null);
                        resetForm();
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-medium hover:scale-105 transition-transform shadow-lg"
                >
                    <Upload size={18} />
                    Add New Asset
                </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filterCategory === 'all'
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                        }`}
                >
                    All Assets
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.value}
                        onClick={() => setFilterCategory(cat.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filterCategory === cat.value
                            ? 'bg-black dark:bg-white text-white dark:text-black'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                            }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <div
                        key={item._id}
                        className={`group bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-300 overflow-hidden ${item.featured
                            ? 'border-amber-400/50 shadow-lg shadow-amber-500/10'
                            : 'border-gray-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-xl'
                            }`}
                    >
                        {/* Preview */}
                        <div className="relative h-48 bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden">
                            {item.fileType?.startsWith('image/') ? (
                                <img
                                    src={item.thumbnailUrl || item.fileUrl}
                                    alt={item.title}
                                    className="w-full h-full object-contain p-4"
                                />
                            ) : (
                                <FileText size={48} className="text-gray-400" />
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => toggleVisibility(item._id, item.isPublic)}
                                    className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                    title={item.isPublic ? 'Make Private' : 'Make Public'}
                                >
                                    {item.isPublic ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                                <button
                                    onClick={() => toggleFeatured(item._id, item.featured)}
                                    className={`p-2 rounded-lg ${item.featured
                                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                                        : 'bg-gray-500 text-white hover:bg-gray-600'
                                        }`}
                                    title={item.featured ? 'Unfeature' : 'Feature'}
                                >
                                    <Star size={18} fill={item.featured ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-2 right-2 flex gap-2">
                                {item.featured && (
                                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        Featured
                                    </span>
                                )}
                                {!item.isPublic && (
                                    <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        Private
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                                    {item.title}
                                </h3>
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                                    {categories.find(c => c.value === item.category)?.label}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{formatFileSize(item.fileSize)}</span>
                                <div className="flex items-center gap-1">
                                    <Download size={12} />
                                    <span>{item.downloadCount || 0}</span>
                                </div>
                            </div>

                            {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {item.tags.slice(0, 3).map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add New Card */}
                <button
                    onClick={() => {
                        setEditItemId(null);
                        resetForm();
                        setIsFormOpen(true);
                    }}
                    className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/5 transition-all min-h-[300px] group"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 group-hover:scale-110 transition-transform flex items-center justify-center mb-4">
                        <Plus size={32} />
                    </div>
                    <span className="font-medium">Add New Asset</span>
                </button>
            </div>

            {/* Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-3xl p-8 shadow-2xl border border-gray-100 dark:border-white/10 transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {editItemId ? 'Edit Asset' : 'New Asset'}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {editItemId ? 'Update asset details.' : 'Add a new press kit asset.'}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 dark:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Category</label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Title</label>
                                    <input
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Primary Logo - Dark"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of the asset..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">File URL</label>
                                    <input
                                        required
                                        type="url"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.fileUrl}
                                        onChange={e => setFormData({ ...formData, fileUrl: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Thumbnail URL (Optional)</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.thumbnailUrl}
                                        onChange={e => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">File Name (Optional)</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.fileName}
                                        onChange={e => setFormData({ ...formData, fileName: e.target.value })}
                                        placeholder="logo.png"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">File Type (Optional)</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.fileType}
                                        onChange={e => setFormData({ ...formData, fileType: e.target.value })}
                                        placeholder="image/png"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">File Size (Optional)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.fileSize}
                                        onChange={e => setFormData({ ...formData, fileSize: parseInt(e.target.value) })}
                                        placeholder="102400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Tags (comma separated)</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="logo, dark, svg, vector"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Dimensions (Optional)</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.metadata.dimensions}
                                        onChange={e => setFormData({ ...formData, metadata: { ...formData.metadata, dimensions: e.target.value } })}
                                        placeholder="1920x1080"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Format (Optional)</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white transition-all"
                                        value={formData.metadata.format}
                                        onChange={e => setFormData({ ...formData, metadata: { ...formData.metadata, format: e.target.value } })}
                                        placeholder="PNG, SVG, PDF"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPublic}
                                        onChange={e => setFormData({ ...formData, isPublic: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Public</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-blue-500/30"
                            >
                                {editItemId ? 'Update Asset' : 'Add Asset'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
