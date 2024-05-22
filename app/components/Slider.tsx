"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const data = [
  {
    id: 1,
    title: "always fresh & hot",
    image: "/assets/slide1.jpg",
  },
  {
    id: 2,
    title: "fast delivery",
    image: "/assets/slide2.jpg",
  },
  {
    id: 3,
    title: "share with your family",
    image: "/assets/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      <div className="w-full flex-1 relative bg-black bg-opacity-80">
        <div className="flex flex-col justify-center items-center gap-6 absolute z-10 text-white uppercase md:font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="md:text-5xl text-center">{data[currentSlide].title}</h1>
            <button className="bg-green-600 hover:bg-green-500 transition-colors text-white py-4 px-8"><Link href="/menu">Order Now</Link></button>
        </div>
            <Image
            src={data[currentSlide].image}
            alt=""
            fill
            className="object-fill md:object-cover mix-blend-overlay"
            />
      </div>
    </div>
  );
};

export default Slider;