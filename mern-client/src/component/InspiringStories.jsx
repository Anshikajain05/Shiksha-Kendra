import React, { useState, useEffect } from "react";
import { Send, Quote, Sparkles, User, Calendar, Image as ImageIcon } from "lucide-react";

const InspiringStories = () => {
    const [stories, setStories] = useState([]);
    const [name, setName] = useState("");
    const [story, setStory] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/all-stories")
            .then(res => res.json())
            .then(data => setStories(data));
    }, []);

    const handleStorySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const storyData = { name, story, date: new Date().toLocaleDateString() };

        try {
            const res = await fetch("http://localhost:5000/add-story", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(storyData)
            });
            const data = await res.json();
            setStories([data, ...stories]);
            setName("");
            setStory("");
            alert("Success! Your story is now live.");
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] pt-20 pb-20">
            {/* 1. HORIZONTAL DEFAULT IMAGE / HERO SECTION */}
            <div className="relative w-full h-[300 md:h-[450] overflow-hidden mb-12">
                <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                    alt="Students studying" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-12">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-black mb-4">Student Wall of Fame</h1>
                        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-light">
                            Turning struggles into success, one chapter at a time.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                
                {/* 2. WRITE YOUR STORY OPTION */}
                <section className="mb-20">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-900/5 border border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                <ImageIcon size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Share Your Journey</h2>
                                <p className="text-slate-500 text-sm">Inspire the community with your experience</p>
                            </div>
                        </div>

                        <form onSubmit={handleStorySubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                    <input 
                                        type="text" value={name} required placeholder="e.g. Rahul Sharma"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button 
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? "Posting..." : "Post Story"} <Send size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Your Story</label>
                                <textarea 
                                    value={story} required rows="4"
                                    placeholder="What challenges did you face and how did Shiksha Kendra help you?"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                    onChange={(e) => setStory(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </section>

                <hr className="border-slate-200 mb-16" />

                {/* 3. ALL OTHER STORIES */}
                <section className="space-y-10">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                            <Sparkles className="text-yellow-500" /> Community Feed
                        </h3>
                        <span className="text-slate-400 text-sm font-medium">{stories.length} stories shared</span>
                    </div>

                    {stories.length > 0 ? stories.map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <Quote className="text-blue-500/20 mb-4" size={40} />
                            <p className="text-slate-700 text-lg leading-relaxed mb-8 italic font-medium">
                                "{s.story}"
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-inner">
                                    {s.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{s.name}</h4>
                                    <p className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar size={12} /> {s.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20">
                            <p className="text-slate-400">The wall is empty. Be the first to write a story!</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default InspiringStories;