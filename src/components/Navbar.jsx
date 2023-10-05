import { useState } from 'react';
import { CgMenu, CgClose } from 'react-icons/cg';
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage the navigation menu open/close
  const [nav, setNav] = useState(false);

  // Function to open the navigation menu
  const openNav = () => {
    setNav(true);
  };

  // Function to close the navigation menu
  const closeNav = () => {
    setNav(false);
  };

  // Array of navigation items
  const listItems = ['home','anime', 'manga', 'movies', 'news'];

  return (
    <>
      {/* Navigation bar */}
      <nav className='flex items-center py-4 px-2 absolute top-0 w-full z-10'>
        <Link to='/'>
          <h1 className='logo text-pro-red text-secondary font-extrabold lg:text-5xl md:text-4xl text-3xl pointer-events-none
          tracking-wider select-none'>
            AnimePalooza
          </h1>
        </Link>

        {/* Desktop navigation menu */}
        <ul className='ml-auto space-x-1 md:space-x-4 hidden sm:flex'>
          {listItems.map((item) => (
            <li className='font-pro-medium font-semibold text-accent text-lg text-white capitalize pr-6' key={item}>
              {<Link to={item!=='home'?`/${item}`:`/`}>{item}</Link>}
            </li>
          ))}
        </ul>

        {/* Mobile navigation menu */}
        {nav ? (
          // When the navigation menu is open
          <>
            <CgClose
              size={40}
              color='white'
              className='ml-auto relative z-50 block sm:hidden mr-4 mt-4'
              onClick={closeNav}
            />
            {/* Background overlay */}
            <div className='fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-md bg-opacity-40 z-[9]'></div>
            {/* Navigation menu items */}
            <ul className='bg-pro-red fixed top-0 right-[0%] h-[70vh] w-72 transition-all space-y-4 px-6 py-14 m-4 rounded-2xl z-10'>
              {listItems.map((item) => (
                <li className='font-semibold text-accent text-lg text-white font-pro-medium capitalize cursor-pointer' key={item}>
                  {<Link to={item!=='home'?`/${item}`:`/`} onClick={closeNav}>{item}</Link>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          // When the navigation menu is closed
          <>
            <CgMenu
              size={40}
              color='white'
              className='ml-auto block sm:hidden'
              onClick={openNav}
            />
            {/* Navigation menu items (hidden off-screen) */}
            <ul className='bg-black fixed top- right-[-100%] h-[70vh] w-72 transition-all'>
              {listItems.map((item) => (
                <li className='font-semibold text-accent text-lg text-white capitalize font-pro-medium' key={item}>
                {<Link to={`/${item}`}>{item}</Link>}
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
