import React from "react";
import img from "../assets/developer.jpg"
const About = () =>{
    return(
        
           // AboutPage.jsx

  
           <div className="bg-white min-h-screen px-48 py-40 md:px-20 lg:px-40">
           <div className="max-w-4xl mx-auto text-center">
             {/* Main Heading */}
             <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
     
             {/* About Website */}
             <p className="text-lg text-gray-700 mb-4">
               Welcome to <span className="font-semibold text-blue-600">Shikha Kendra</span>  Our platform offers well-organized, easy-to-understand, and exam-focused study materials designed to help you score higher — faster.
             </p>
             <p className="text-lg text-gray-700 mb-4">
             📘 Subject-Wise Notes
Clear, concise, and crafted by experts & toppers.

📝 Solved Past Papers
Understand exam patterns and practice smart.

🎓 Course-Wise Bundles
Get everything you need in one download.

📊 Presentations & Summaries
Perfect for quick revisions and project prep.
             </p>
             <p className="text-lg text-gray-700 mb-4">
             To empower students with high-quality, well-organized, and exam-focused study materials that simplify learning, boost confidence, and drive academic success — all in one accessible platform."


             </p>
     
             {/* Divider */}
             <div className="my-10 border-t border-gray-200"></div>
     
             {/* About Developer */}
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet the Developer</h2>
             <div className="flex flex-col items-center md:flex-row md:items-start gap-6 text-left">
               {/*<img
                 //src={img}
                 alt="Developer"
                 className="w-40 h-40 rounded-full border-4 border-blue-500"
               />*/}
               <div>
                 <h3 className="text-xl font-semibold text-gray-800">Anshika Jain</h3>
                 <p className="text-gray-700 mt-2">
                   I'm a passionate web developer who loves building clean, user-friendly websites that solve real problems. I created Shikha Kendra for Making quality education resources accessible to every learner — anytime, anywhere  and share knowledge effortlessly.
                 </p>
                 <p className="text-gray-700 mt-2">
                   Tech Stack: React.js, Tailwind CSS, Node.js, Firebase,Mongodb.
                 </p>
                 <p className="text-gray-700 mt-2">
                   Feel free to reach out via{" "}
                   <a href="mailto:anshika31102005@gmail.com" className="text-blue-600 underline">
                     email
                   </a>{" "}
                   or connect on{" "}
                   <a href="https://linkedin.com/in/anshika2005a" className="text-blue-600 underline">
                     LinkedIn
                   </a>
                   .
                 </p>
               </div>
             </div>
           </div>
         </div>
 

        
    )
}
export default About