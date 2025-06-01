import React from 'react';
import {
  AiFillTwitterCircle, AiFillLinkedin,
} from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useGetContactsQuery } from '../../redux/contact/contactSlice';
import img from '../../assets/image/ethiotech.jpeg';

export default function Header() {
  const { data: contacts = [] } = useGetContactsQuery();

  return (
    <div className="md:flex hidden justify-between items-center px-4 py-2">
      <div className="w-20">
        <link rel="stylesheet" href="/Home" />
        <a href="/">
          <img src={img} alt="logo" />
        </a>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium text-md font-poppins hover:text-mainColor hover:underline cursor-pointer">
          {contacts[0]?.phone}
        </span>
        <div className="flex gap-3 text-lg text-red-600">
          <Link to="https://whatsapp.com/channel/" className="hover:opacity-60"><BsWhatsapp /></Link>
          <Link to="https://twitter.com/EtatTech" className="hover:opacity-60"><AiFillTwitterCircle /></Link>
          <Link to="https://www.linkedin.com/company/etat-tech/" className="hover:opacity-60"><AiFillLinkedin /></Link>
        </div>
      </div>
    </div>
  );
}

