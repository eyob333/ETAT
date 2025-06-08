"use client";

import React from "react";
import { InfiniteMovingCards } from "../components/ui/movingCards"; // Adjust the import path if needed


export default function Eyob() {
  // Array of partner logo URLs
 
  const partnerLogos = [
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166769/1_sarmng.jpg", // Replace with your actual logo URLs
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166755/6_hskjw8.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166756/7_lx5sil.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166769/vmware-logo_ozhrab.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166758/Samsung-Logo-2005-present_mxrxxy.jpg",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166769/2_yjscr2.jpg",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166768/01-nvidia-logo-horiz-500x200-2c50-p_2x_agcfrv.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166768/2_o2tofd.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166757/lg-logo-life-s-good-editorial-free-vector_fe0bw1.jpg",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166758/RUCKUS-logo-e1596222597479_gtk8og.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166758/tp-link-logo_u1unmf.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166757/Lenovo-Logo-1_ue5srx.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166758/Sharp-logo_iteexf.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166757/8_lay4hh.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166757/Infosys_logo.svg_k3tpeh.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166757/ibm-logo-black_dmsmjx.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166757/5_q4xtpb.png",
    "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166757/Fortinet_logo.svg_vbaq0v.png",
     "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166756/Epson-Logo_mncgbk.png",
     "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166756/checkpoint-logo-stacked-large-blk_yfiv5n.png",
     "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166756/Axis_reel8l.png",
     "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166755/4_tqvaeb.png",
     "https://res.cloudinary.com/deqp41wyr/image/upload/v1749166755/Dell_Logo.svg_gdypnm.png",
     
     
  ];

  // Transform the logo URLs into the data format expected by InfiniteMovingCards
  const partnerItems = partnerLogos.map((logoUrl) => ({
    image: logoUrl,
    title: "", // You can keep the title empty since you only want to display logos
  }));

  return (
    <div className="w-full overflow-hidden">
      
      <div
        className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 items-center" // Adjusted height, removed rounded-md, added background
      >
 
        <InfiniteMovingCards
          items={partnerItems}
          direction="right" // Or "right", depending on your preference
          speed="slow" // Adjust the speed as needed
          className="py-2" // Added some padding
        />
      </div>
      <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Featured Brands</h1>
            <div className="flex items-center justify-center md:justify-start mt-2 space-x-1">
            </div>
          
          </div>
    </div>
  );
}


