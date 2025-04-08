/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidDashboard, BiSolidContact } from 'react-icons/bi';
import { AiFillDatabase, AiFillProject } from 'react-icons/ai';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { FaNewspaper, FaUserFriends, FaUsersCog } from 'react-icons/fa';
import { GrServices } from 'react-icons/gr';
import { IoMdContact } from 'react-icons/io';
import { RiComputerFill } from 'react-icons/ri';
import { IoLogOut } from 'react-icons/io5';
import { userSelector } from '../redux/store';
import { logOut, selectCurrentUser } from '../redux/auth/authSlice';
import { fetchUser, setAdmin } from '../redux/user/userSlice';
import logo from '../assets/image/ethiotech2.png';

export default function Dashboard() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const { users, isLoading } = useSelector(userSelector);

  let filteredUser = [];
  if (isLoading === false && users.length > 0) {
    filteredUser = users.filter((u) => u.email === user);
  }
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setAdmin(filteredUser));
  }, [filteredUser.length]);

  const [showSidebar, setShowSidebar] = useState(false);
  const handleButtonClick = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const links = [
    {
      to: '/admin',
      text: 'Dashboard',
      icon: <BiSolidDashboard />,
    },
    {
      to: '/admin/jobs',
      text: 'Jobs',
      icon: <RiComputerFill />,
    }, {
      to: '/admin/trainings',
      text: 'Trainings',
      icon: <AiFillDatabase />,
    }, {
      to: '/admin/events',
      text: 'Events',
      icon: <BsFillCalendarEventFill />,
    }, {
      to: '/admin/services',
      text: 'Services',
      icon: <GrServices />,
    }, {
      to: '/admin/projects',
      text: 'Projects',
      icon: <AiFillProject />,
    }, {
      to: '/admin/partners',
      text: 'Partners',
      icon: <FaUserFriends />,
    },
    {
      to: '/admin/news',
      text: 'News',
      icon: <FaNewspaper />,
    },
    {
      to: '/admin/contact',
      text: 'Contact',
      icon: <BiSolidContact />,
    },
    {
      to: '/admin/add',
      text: 'Users',
      icon: <FaUsersCog />,
    },

    // Add more links here if needed
  ];
  return (
    <div>
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button type="button" id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded" onClick={handleButtonClick}>
                {!showSidebar
                  ? (
                    <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  )
                  : (
                    <svg id="toggleSidebarMobileClose" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
              </button>
              <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                <img src={logo} className="h-6 mr-2" alt="Windster Logo" />
                <span className="self-center whitespace-nowrap">EthioTech</span>
              </a>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <img src={isLoading === false && filteredUser.length > 0 ? filteredUser[0].picture : 'user'} alt="img" className="w-12 h-12 bg-red-400 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{isLoading === false && filteredUser.length > 0 ? filteredUser[0].email : 'user' }</span>
                <span className="text-xs font-medium text-gray-500">{isLoading === false && filteredUser.length > 0 ? `${filteredUser[0].first_name} ${filteredUser[0].last_name}` : 'user' }</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex overflow-hidden bg-white pt-16">
        <aside
          id="sidebar"
          className={`fixed z-20 h-full top-0 left-0 pt-16 md:flex flex-shrink-0 flex-col w-64 transition-width duration-75 ${
            showSidebar ? 'flex' : 'hidden'
          }`}
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                <ul className="space-y-2 pb-2">

                  {links.map((link) => (
                    <li key={link.text}>
                      <NavLink
                        to={link.to}
                        className="text-base admin text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                      >
                        {link.icon}
                        <span className="ml-3">{link.text}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2 pt-2">
                  <Link to="/admin/profile" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                    <IoMdContact />
                    <span className="ml-4">Profile</span>
                  </Link>
                  <button type="button" className="text-base text-red-600 font-normal w-full rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2" onClick={handleLogout}>
                    <IoLogOut />
                    <span className="ml-3">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {/* {showSidebar && (
        <div className="bg-gray-900 opacity-50 fixed inset-0 z-10" id="sidebarBackdrop" onClick={handleButtonClick} />
        )} */}
        <div id="main-content" className="h-full w-full bg-white relative overflow-y-auto lg:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
