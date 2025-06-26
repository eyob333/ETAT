import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import img from '../../assets/image/log1.jpg';
// import { MdArrowDropDown } from 'react-icons/md';



export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility
  const [showContent, setShowContent] = useState(false);

  const handleButtonClick = () => {
    setShowContent(!showContent);
  };

  const links = [
    { 
      path: '/', label: 'Home' },
    {
      path: '',
      label: 'Company',
      dropdownLinks: [
        { path: '/aboutUs', label: 'About Us' },
        // { path: '/team', label: 'Team' },
        { path: '/trainings', label: 'Traninigs' },
        { path: '/event', label: 'Events' },
        { path: '/partner', label: 'Partners' },
        // { path: '/career', label: 'Career' },
      ],
    },
      { path: '/products', label: 'Products' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Project' },
    { path: '/news', label: 'News' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="sticky top-0 z-30">
      <nav className="flex relative items-center">
        {/* Logo always on the left for mobile */}
        <div className="h-16 w-30 flex-shrink-0 flex  justify-center md:hidden pl-0 py-0">
          <a href="/" className="h-full w-full flex items-center justify-center">
            <img src={img} alt="logo" className="h-full w-auto object-contain" />
          </a>
        </div>
        <div className="md:flex md-flex-col w-full relative h-16 gap-8 text-sm items-center px-8 py-4 font-poppins font-medium text-white shadow-xl bg-mainColor">
          <div className={`md:flex md-flex-col relative gap-8 mt-28 md:mt-0 ${showContent ? 'bg-black md:bg-transparent mt-[70px] md:mt-0 py-14 md:py-0' : ''}`}>
            {links.map((link) => (
              <div key={link.label} onMouseEnter={link.label === 'Company' ? toggleDropdown : null} onMouseLeave={link.label === 'Company' ? closeDropdown : null} className="">
                <div className={` transition-all duration-500 transform md:flex ${showContent ? 'flex flex-col bg-black md:bg-transparent relative justify-center items-center gap-4 translate-y-0' : 'hidden'}`}>
                  { link.label === 'Company' ? (
                    <button type="button" className="hover:text-red-600 inline-flex gap-3 justify-center items-center duration-300 ease-in-out text-white py-6 md:text-white md:py-5" to={link.path} onClick={link.label === 'Company' ? null : handleButtonClick}>
                      <span>{link.label}</span>
                      <span className="text-lg"><RiArrowDropDownLine /></span>
                    </button>
                  )
                    : (
                      <NavLink className="hover:text-red-600 duration-300 ease-in-out text-white py-6 md:text-white md:py-5" to={link.path} onClick={link.label === 'Company' ? null : handleButtonClick}>
                        {link.label}
                      </NavLink>
                    )}
                </div>
                {link.label === 'Company' && isDropdownOpen && (
                  <div className={`absolute z-20 md:flex md:flex-col font-medium text-sm gap-2 bg-white text-gray-400 w-full md:w-48 px-3 py-2 shadow-md mt-0 md:ml-0 left-0 md:left-[75px] border-t-2 border-red-600 ${showContent ? 'flex flex-col justify-center items-center md:justify-start md:items-start w-full' : 'hidden'}`}>
                    {link.dropdownLinks.map((dropdownLink) => (
                      <NavLink className="hover:text-red-600 duration-300 ease-in-out" key={dropdownLink.label} to={dropdownLink.path} onClick={handleButtonClick}>
                        {dropdownLink.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Hamburger/close icon always on the right for mobile */}
        <div className="flex items-center gap-4 md:hidden absolute text-lg text-white right-6 top-2 justify-end">
          <button type="button" className="text-lg" onClick={handleButtonClick}>
            { !showContent ? <GiHamburgerMenu /> : <IoCloseSharp />}
          </button>
        </div>
      </nav>
    </div>
  );
}

