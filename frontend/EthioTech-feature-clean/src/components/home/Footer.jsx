import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillLinkedin } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import img from '../../assets/image/ethiotech2.png';

export default function Footer() {
  return (
    <div className="relative z-20 bg-red-500">
      <footer className="bg-black">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-20">
          <div className="grid grid-cols-1 gap-y-8 gap-x-1 lg:grid-cols-2">
            <div className="">
              <img src={img} className="mr-5 h-10 sm:h-20" alt="logo" />
              <p className="max-w-xs mt-4 text-sm text-gray-400">
                Trust ETAT for reliable and innovative solutions.
              </p>
              <div className="flex mt-8 space-x-6 text-gray-400">
                <Link to="/" className="hover:text-secondColor" target="_blank">
                  <span className="sr-only"> LinkedIn </span>
                  <AiFillLinkedin className="text-2xl" />
                </Link>
                <Link to="https://whatsapp.com/channel/" className="hover:text-secondColor" target="_blank">
                  <span className="sr-only"> Instagram </span>
                  <BsWhatsapp className="text-2xl" />
                </Link>
                <Link to="/" className="hover:text-secondColor" target="_blank">
                  <span className="sr-only"> Twitter </span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-1 sm:grid-cols-2 lg:grid-cols-2">
              <div>
                <p className="font-medium font-raleway text-white opacity-90">
                  Company
                </p>
                <nav className="flex flex-col font-poppins mt-4 space-y-2 text-sm text-gray-500">
                  <Link className="hover:text-secondColor" to="/aboutUs"> About </Link>
                  <Link className="hover:text-secondColor" to="/team"> Meet the Team </Link>
                  <Link className="hover:text-secondColor" to="/services"> Services </Link>
                  <Link className="hover:text-secondColor" to="/trainings"> Trainings </Link>
                  <Link className="hover:text-secondColor" to="/event"> Events </Link>
                  <Link className="hover:text-secondColor" to="/career"> Career </Link>
                </nav>
              </div>
              <div>
                <p className="font-medium font-raleway text-white opacity-90">
                  Quick Links
                </p>
                <nav className="flex flex-col font-poppins mt-4 space-y-2 text-sm text-gray-500">
                  <Link className="hover:text-secondColor" to="/projects"> Projects </Link>
                  <Link className="hover:text-secondColor" to="/partner"> Partners </Link>
                  <Link className="hover:text-secondColor" to="/news"> News </Link>
                  <Link className="hover:text-secondColor" to="/contact"> Contact </Link>
                </nav>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-300">
            © 2022 EthioTech-Addis Trading PLC
          </p>
        </div>
      </footer>
    </div>
  );
}
