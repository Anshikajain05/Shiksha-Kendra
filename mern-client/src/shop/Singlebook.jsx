import React, { useState, useEffect, useCallback } from "react";
import { useLoaderData } from "react-router";
import { FaDownload, FaStar, FaHistory, FaPaperPlane, FaBookReader, FaChevronDown, FaChevronUp } from "react-icons/fa";

const SingleBook = () => {
    const { _id, bookTitle, imageURL, bookDescription, bookPDFURL, authorName } = useLoaderData();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);

    // --- NEW: FUNCTION TO INCREMENT DOWNLOAD COUNT ---
    const handleDownload = () => {
        // 1. Tell the backend to increment the resourceCount
        fetch("http://localhost:5000/track-download", { 
            method: "POST" 
        })
        .then(() => console.log("Download tracked successfully"))
        .catch(err => console.error("Error tracking download:", err));

        // 2. Open the PDF in a new tab for the actual download
        window.open(bookPDFURL, "_blank");
    };

    const fetchComments = useCallback(async () => {
        if (!_id) return;
        try {
            const res = await fetch(`http://localhost:5000/comments/${_id}`);
            if (res.ok) {
                const data = await res.json();
                setComments(Array.isArray(data) ? data : []);
            }
        } catch (err) { console.error(err); }
    }, [_id]);

    useEffect(() => { fetchComments(); }, [fetchComments]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentData = {
            bookId: _id,
            user: "Student User",
            text: newComment,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
        };

        try {
            const res = await fetch("http://localhost:5000/add-comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentData)
            });
            if (res.ok) { setNewComment(""); fetchComments(); }
        } catch (error) { console.error(error); }
    };

    const visibleComments = showAllComments ? comments : comments.slice(0, 3);

    return (
        <div className="relative min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">
            {/* CINEMATIC BACKGROUND BLUR */}
            <div className="fixed inset-0 z-0">
                <img src={imageURL} alt="" className="w-full h-full object-cover scale-110 blur-[100px] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
            </div>

            <div className="relative z-10 pt-20 pb-20 px-4 lg:px-24 max-w-7xl mx-auto">
                
                {/* 1. HORIZONTAL IMAGE BANNER */}
                <div className="w-full mb-12">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] blur opacity-20"></div>
                        <img 
                            src={imageURL} 
                            alt={bookTitle} 
                            className="relative rounded-[40px] shadow-2xl w-full h-[400px] lg:h-[550px] object-cover border border-white/10" 
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 bg-gradient-to-t from-black/80 to-transparent rounded-b-[40px]">
                            <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter mb-2">
                                {bookTitle}
                            </h1>
                            <p className="text-slate-300 text-lg">Resource by <span className="text-blue-400 font-bold">{authorName || "Shiksha Kendra Scholar"}</span></p>
                        </div>
                    </div>
                </div>

                {/* 2. DESCRIPTION CARD */}
                <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 lg:p-12 mb-16 shadow-2xl">
                    <div className="max-w-5xl">
                        <h3 className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center gap-3">
                            <FaBookReader /> Overview & Details
                        </h3>
                        <p className="text-base lg:text-lg text-slate-300 leading-relaxed font-normal opacity-90">
                            {bookDescription}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mt-10">
                            {/* --- MODIFIED: DOWNLOAD BUTTON NOW CALLS handleDownload --- */}
                            <button 
                                onClick={handleDownload}
                                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-blue-400 transition-all flex items-center gap-2"
                            >
                                <FaDownload /> Download Notes
                            </button>

                            <button className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                                <FaStar className="text-amber-400" /> Save to Library
                            </button>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: DISCUSSION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[32px]">
                        <h3 className="text-xl font-bold mb-6">Leave a Review</h3>
                        <form onSubmit={handleCommentSubmit} className="space-y-4">
                            <textarea 
                                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 focus:border-blue-500 outline-none transition-all resize-none text-sm"
                                rows="4"
                                placeholder="Share your experience..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                            />
                            <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-500 flex items-center justify-center gap-2 text-sm">
                                <FaPaperPlane /> Post Comment
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-3">
                            <FaHistory className="text-slate-500" /> Resource History
                        </h3>
                        <div className="space-y-4">
                            {visibleComments.length > 0 ? (
                                visibleComments.map((c, i) => (
                                    <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-white/20 transition-all">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-blue-400 text-sm">{c.user}</span>
                                            <span className="text-[9px] uppercase font-black text-slate-500">{c.date}</span>
                                        </div>
                                        <p className="text-slate-300 text-sm italic">"{c.text}"</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 italic text-sm">No notes posted yet.</p>
                            )}

                            {comments.length > 3 && (
                                <button 
                                    onClick={() => setShowAllComments(!showAllComments)}
                                    className="w-full py-3 border border-dashed border-white/20 rounded-xl text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2 font-bold text-xs"
                                >
                                    {showAllComments ? <><FaChevronUp /> Less</> : <><FaChevronDown /> More ({comments.length - 3})</>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;