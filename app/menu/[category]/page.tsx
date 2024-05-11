import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductType } from "@/app/types/types";

const getProducts = async (category:string) => {
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
    cache: "no-store"
  });

  if(!res.ok) {
    throw new Error("Failed")
  }

  return res.json();
}

type Props = {
  params: {category: string}
}

const CategoryPage = async ({params}:Props) => {
  const products:ProductType[] = await getProducts(params.category)
  return (
    <div className="flex flex-wrap text-green-600 bg-zinc-900">
      {products.map((item) => (
        <Link className="w-full h-[60vh] border-r-2 border-b-2 border-green-600 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group hover:bg-zinc-700 transition duration-200" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain"/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold flex-col gap-4">
              <h1 className="text-xl lg:text-2xl uppercase p-2">{item.title}</h1>
              <h2 className="text-xl text-white">${item.price}</h2>
            <button className=" uppercase bg-green-500 text-white p-2 rounded-md hover:bg-green-400 transition duration-150">Add to Cart</button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;