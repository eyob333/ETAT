/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
// import Home from '../components/home/Home';
// import NotFoundPage from '../components/Notfound';
// import NewsPost from '../components/news/NewsPost';
// import Career from '../components/career/Career';
// import Job from '../components/career/Job';
// import About from './About';
// import Contact from './Contact';
// import Partner from './Partner';
// import Project from './Project';
// import Service from './Service';
// import Team from './Team';
// import News from './News';
// // import TrananigList from '../components/training/TrananigList';
// import Tranings from './Tranings';
// import Events from '../components/event/Events';
import Header from '../components/home/Header';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

export default function Page() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
