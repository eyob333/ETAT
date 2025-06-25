import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillTwitterCircle, AiFillLinkedin, AiOutlineWechat
} from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import { contactSelector } from '../../redux/store';
// import { fetchContact } from '../../redux/contact/contactSlice';
import img from '../../assets/image/log1.jpg';

export default function Header() {
  // const dispatch = useDispatch();
  // const { contacts } = useSelector(contactSelector);

  // useEffect(() => {
  //   if (contacts.length === 0) {
  //     dispatch(fetchContact());
  //   }
  // }, [dispatch, contacts.length]);

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
          
          {/* {' '} */}
          {/* {contacts.phone} */}
        </span>
        <div className="flex gap-3 text-lg text-red-600">
        <Link to="https://www.linkedin.com/company/etat-tech/" className="hover:opacity-60"><AiFillLinkedin /></Link>
          <Link to="https://whatsapp.com/channel/0029VaLL7z28kyyU5KIEZH0r" className="hover:opacity-60"><BsWhatsapp /></Link>
          <Link to=" https://twitter.com/EtatTech" className="hover:opacity-60"><AiFillTwitterCircle /></Link>
        <Link to=" https://u.wechat.com/kEHi0oDEezhK0FSRZBBl-xE?s=2" className="hover:opacity-60">< AiOutlineWechat /></Link>
        
          {/* <Link to="https://whatsapp.com/channel/" className="hover:opacity-60"><BsWhatsapp /></Link>
          <Link to=" https://twitter.com/EtatTech" className="hover:opacity-60"><AiFillTwitterCircle /></Link>
          <Link to="https://www.linkedin.com/company/etat-tech/" className="hover:opacity-60"><AiFillLinkedin /></Link> */}
        </div>
      </div>
    </div>
  );
}

