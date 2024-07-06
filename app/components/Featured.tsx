import Image from "next/image";
import React from "react";
import { ProductType } from "../types/types";
import Link from "next/link";
import prisma from "../utils/connect";
import { NextResponse } from "next/server";

const getProducts = async () => {

  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        isFeatured: true,
      },
    });
    const res = new NextResponse(JSON.stringify(featuredProducts), {status: 200});
    return res.json()
  } catch(err){
    console.log(err);
    return new NextResponse(JSON.stringify({message: "Something went wrong!"}), {status: 500});
  }

}

const Featured = async () => {
  const featuredProducts:ProductType[] = await getProducts();
  return (
    <div className=" overflow-x-scroll text-green-600 bg-black">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-zinc-900 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl text-white">{item.title}</h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold text-white">${item.price}</span>
              <button className="bg-green-600 text-white p-2 rounded-md hover:bg-green-400 transition duration-150">
                <Link href={`/menu`}>Order Now</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;