import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavBookImg from '../assets/favoritebook.jpg'

const FavBook = () => {
    const [stats, setStats] = useState({ userCount: 0, resourceCount: 0 });

    useEffect(() => {
        fetch("http://localhost:5000/site-stats")
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Stats fetch error:", err));
    }, []);

    return (
        <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12 mt-24">
            <div className="md:w-1/2">
                <img src={FavBookImg} alt="Library" className="rounded-2xl shadow-2xl md:w-10/12 transition-transform hover:scale-105" />
            </div>

            <div className="md:w-1/2 space-y-8">
                <h2 className="text-5xl font-extrabold text-slate-900 leading-tight">
                    Find Your Favorite <span className="text-blue-700">Resources Here!</span>
                </h2>
                
                <p className="text-lg text-slate-600 md:w-11/12 leading-relaxed">
                    Explore a vast collection of academic materials contributed by students worldwide. 
                    From handwritten notes to textbook PDFs, everything you need is just a click away.
                </p>

                {/* STATS SECTION UPDATED */}
                <div className="flex flex-col sm:flex-row justify-between gap-10 py-6 border-y border-slate-100">
                    <div>
                        {/* This now displays the number of books uploaded */}
                        <h3 className="text-4xl font-black text-slate-800">{stats.userCount}+</h3>
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Total Resources</p>
                    </div>
                    <div>
                        {/* This displays the total number of downloads */}
                        <h3 className="text-4xl font-black text-slate-800">{stats.resourceCount}+</h3>
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Total Downloads</p>
                    </div>
                </div>

                <Link to="/shop" className="block pt-4">
                    <button className="bg-blue-700 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-black transition-all duration-300">
                        Explore Library
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default FavBook;