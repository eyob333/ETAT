import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillLinkedin, AiOutlineWechat } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import img from '../../assets/image/ethiotech2.webp';

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
                <Link to=" https://www.wechat.com/`" className="hover:text-secondColor" target="_blank">
                <span className="sr-only"> Wechat </span>
                <AiOutlineWechat className="text-2xl" />
            
                
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
                  {/* <Link className="hover:text-secondColor" to="/team"> Meet the Team </Link> */}
                  <Link className="hover:text-secondColor" to="/services"> Services </Link>
                  <Link className="hover:text-secondColor" to="/trainings"> Trainings </Link>
                  <Link className="hover:text-secondColor" to="/event"> Events </Link>
                  {/* <Link className="hover:text-secondColor" to="/career"> Career </Link> */}
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
                {/* <p className="mt-8 text-xs text-gray-300">
            Developed by Eyob & Mihret
          </p> */}
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-300">
            © 2025 EthioTech-Addis Trading PLC
          </p>
        </div>
      </footer>
    </div>
  );
}

