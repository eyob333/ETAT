"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/movingCards"; // Adjust the import path if needed
import convertToWebP from "../../utils/ToWebp";

export default function PartnerMovingCards() {
  // Array of partner logo URLs
  const partnerLogos = [
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837231/AI_ghjv88.png"), // Replace with your actual logo URLs
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837288/GCS_cu4ktn.jpg"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837292/MINT_pqv4qw.png"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837303/TECHIN1_qv03we.png"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837301/PMO_kvzlhs.jpg"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837298/NID_bw1oko.png"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837296/MoA_v8u6wp.png"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837254/EIH_jq8vhx.png"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837262/Ethiopost_hj7ncg.png"),
    convertToWebP("https://res.cloudinary.com/deqp41wyr/image/upload/v1745837247/Amhara_revenue_Bureau_wdvwh3.jpg"),
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
    </div>
  );
}


