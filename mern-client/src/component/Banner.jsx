import React from 'react'
import BannerCard from '../home/BannerCard'
const Banner = () =>{
    return(
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
       <div className='flex  w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/*left side*/ }
        <div className='md:w-1/2 space-y-8 h-full' >
            <h2 className='text-5xl font-bold leading-snug text-black '>Ace Your Exams with Expert-Curated Materials</h2>
            <p className='md:w-4/5'>Say goodbye to last-minute panic! Our platform delivers clear, concise, and exam-ready study materials — everything you need to study smart and score higher, faster.
            The platform allows students, educators, and professionals to upload  their notes, study guides, presentations, solved papers, and other academic content</p>
                 {/* <div>
                    <input type ="search" name="search" placeholder="search a book" className='py-2 px-2 rounded-l-sm outline-none'></input>
                    <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Search</button>
                 </div> */}
        </div>
         {/*right side*/ }
        <div>
             <BannerCard/>
        </div>
       </div>
        </div>
    )
}
export default Banner