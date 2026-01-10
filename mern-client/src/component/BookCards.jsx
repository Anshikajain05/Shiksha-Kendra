import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { Pagination } from 'swiper/modules';

const BookCards = ({ headline, books }) => {
    return (
        <div className='my-16 px-4 lg:px-24'>
           {/* Change 'my-5' to 'mb-10' or 'mb-16' for a larger gap */}
<h2 className='text-5xl text-center font-bold text-black mb-12'>{headline}</h2>
            
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 40 },
                        1024: { slidesPerView: 5, spaceBetween: 50 },
                    }}
                    modules={[Pagination]}
                    className="mySwiper w-full h-full"
                >
                    {
                        books.map(book => (
                            <SwiperSlide key={book._id}>
                                <Link to={`/book/${book._id}`}>
                                    {/* --- Image Container Fixed Height --- */}
                                    <div className='relative h-80 w-full overflow-hidden rounded-lg bg-gray-100'>
                                        <img 
                                            src={book.imageURL} 
                                            alt={book.bookTitle} 
                                            className='h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105'
                                        />
                                        <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
                                            <FaCartShopping className='w-4 h-4 text-white' />
                                        </div>
                                    </div>

                                    {/* --- Text Content Fixed Height to align rows --- */}
                                    <div className='mt-3'>
                                        <h3 className='text-base font-semibold text-black truncate'>
                                            {book.bookTitle}
                                        </h3>
                                        <p className='text-sm text-gray-600 truncate'>
                                            {book.authorName}
                                        </p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default BookCards;