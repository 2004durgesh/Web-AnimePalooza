import { useState } from 'react';
import { CgMenu, CgClose } from 'react-icons/cg';
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage the navigation menu open/close
  const [nav, setNav] = useState(false);

  // Array of navigation items
  const listItems = ['home', 'anime', 'manga', 'movies', 'news'];

  return (
    <>
      {/* Navigation bar */}
      <nav className='flex items-center py-4 px-2 absolute top-0 w-full z-10'>
        {/* Background overlay for mobile menu */}
        <div className='sm:hidden fixed inset-0 backdrop-filter backdrop-blur-md bg-opacity-40 z-[0]'></div>

        <Link to='/'>
          <h1 className='logo relative text-pro-red text-secondary font-extrabold lg:text-5xl md:text-4xl text-3xl pointer-events-none
          tracking-wider select-none'>
            AnimePalooza
          </h1>
        </Link>

        {/* Desktop navigation menu */}
        <ul className='ml-auto space-x-1 md:space-x-4 hidden sm:flex'>
          {listItems.map((item) => (
            <li className='font-pro-medium font-semibold text-accent text-lg text-white capitalize pr-6 cursor-pointer' key={item}>
              {/* React Router Link for navigation */}
              {<Link to={item !== 'home' ? `/${item}` : `/`}>{item}</Link>}
            </li>
          ))}
        </ul>

        {/* Mobile menu icon */}
        <div className='ml-auto block sm:hidden relative  mr-4 mt-4'>
          {nav ?
            <CgClose
              size={40}
              color='white'
              className='relative z-50'
              onClick={() => setNav(prevValue => !prevValue)}
            /> :
            <CgMenu
              size={40}
              color='white'
              onClick={() => setNav(prevValue => !prevValue)}
            />}
        </div>

        {/* Mobile navigation menu */}
        <ul className={nav ? "fixed top-0 right-0 h-[70vh] w-72 mr-4 mt-4 bg-pro-red rounded-2xl space-y-4 px-6 py-14 m-4 md:hidden ease-in duration-200" : "fixed top-0 -right-full ease-out duration-200 "}>
          {listItems.map((item) => (
            <li className='font-semibold text-accent text-lg text-white font-pro-medium capitalize cursor-pointer' key={item}>
              {/* React Router Link for navigation */}
              {<Link to={item !== 'home' ? `/${item}` : `/`} onClick={() => setNav(prevValue => !prevValue)}>{item}</Link>}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
