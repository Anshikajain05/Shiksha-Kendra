import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from "react-icons/fa6";
import { Pagination, Autoplay } from 'swiper/modules';
import propic from "../assets/profile.jpg";

const Review = () => {
    // Array to store reviews for cleaner code
    const reviews = [
        { id: 1, name: "Mark Ping", role: "CEO, ABC Company", text: "The study resources here are top-notch. I found exactly what I needed for my research papers. The download process is seamless!" },
        { id: 2, name: "Anshika Jain", role: "Graduate Student", text: "This platform has completely changed how I prepare for exams. The community notes are incredibly helpful and easy to follow." },
        { id: 3, name: "Robert T.", role: "Edu Consultant", text: "Highly recommend for anyone looking for quality academic materials. The user interface is clean and the content is verified." },
        { id: 4, name: "Priyanka J.", role: "Professor", text: "A great initiative to bridge the gap in resource accessibility. I often recommend my students to check this repository." },
        { id: 5, name: "Bini Sharma", role: "Self Learner", text: "Excellent collection of technical papers. The PDF viewer works perfectly on mobile devices which is a huge plus for me." },
    ];

    return (
        <div className="my-20 px-4 lg:px-24">
            <h2 className="text-5xl font-bold text-center mb-10 text-gray-900 leading-snug">
                What Our Users Say
            </h2>

            <div className='my-12'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper pb-14"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id} className='bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300'>
                            <div className='space-y-6'>
                                {/* Quote Icon and Stars */}
                                <div className='flex justify-between items-center'>
                                    <div className='text-amber-400 flex gap-1'>
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                    </div>
                                    <FaQuoteLeft className='text-gray-200 text-3xl' />
                                </div>

                                {/* Review Text */}
                                <div className='mt-5'>
                                    <p className="text-gray-600 leading-relaxed min-h-[100px]">
                                        {review.text}
                                    </p>
                                    
                                    {/* Profile Section */}
                                    <div className='flex items-center gap-4 mt-8'>
                                        <img 
                                            src={propic} 
                                            alt="user profile" 
                                            className='w-14 h-14 rounded-full border-2 border-blue-500 p-0.5 object-cover'
                                        />
                                        <div>
                                            <h5 className='text-lg font-bold text-gray-900 leading-none'>
                                                {review.name}
                                            </h5>
                                            <p className='text-sm text-blue-600 mt-1 font-medium'>
                                                {review.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Review;