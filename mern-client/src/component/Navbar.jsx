import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
   
    const {user} = useContext(AuthContext);
    console.log(user);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false)
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, [])
    //nav item
    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
      //  { link: "Blog", path: "/blog" },
        { link: "upload your Resources", path: "/admin/dashboard" },
        { link: "Search", path: "/shop" },
//  { link: "Stories", path: "/inspiringStories" },
        {link: "Favourite", path:"/Cart"}

    ]
    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 Z-100000'>
            <nav className={`py-4 lg:px-20 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300":" "}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/*logo*/}
                    <Link to='/' className='text-2xl font-bold text-blue-700 flex items-center gap-2'>
                        <FaBlog className='inline-block' />Shikha Kendra</Link>

                    { /*nav item for large device*/}
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({ link, path }) => <Link key={path} to={path}
                                className='block text-base text-black uppercase cursor-point text-blue-700'>{link}
                            </Link>)
                        }
                    </ul>

                    {/*btn for lg device*/}
                    <div className='space-x-12 hidden lg=flex item-center'>
                        <button><FaBarsStaggered className='w-s hover:text-blue-700' /></button>
                       
                    </div>

                    {/*menu btn for mobile devices*/}
                    <div className='md-hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
                            }
                        </button>
                    </div>
                    </div>

                    <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? 'block top-0 right-0 left-0' : "hidden"}`}>


                    {navItems.map(({ link, path }) => <Link key={path} to={path}
                        className='block text-base text-white uppercase cursor-point'>{link}
                    </Link>)
                    }
                </div>
            </nav>
        </header>

    )
}
export default Navbar