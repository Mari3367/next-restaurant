import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import Link from "next/link";

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/assets/offerBg.png')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-2xl sm:text-5xl font-bold xl:text-6xl">Delicious Burger & French Fry</h1>
        <p className="text-white xl:text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce efficitur dolor tellus, eu tristique tortor rutrum a.</p>
        <CountDown/>
        <button className="bg-green-600 text-white rounded-md py-3 px-6 hover:bg-green-400 transition duration-150"><Link href="/menu">Order Now</Link></button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/assets/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;