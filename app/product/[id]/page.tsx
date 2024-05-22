import Price from "@/app/components/Price";
import Image from "next/image";
import React from "react";
import { ProductType } from "@/app/types/types";
import DeleteBtn from "@/app/components/DeleteBtn";


const getProduct = async (id:string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });

  if(!res.ok) {
    throw new Error("Failed")
  }
  return res.json();
}


const SingleProductPage = async ({params}:{ params:{id:string}} ) => {

  const singleProduct:ProductType = await getProduct(params.id);
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-green-600 bg-zinc-900 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-[80%] flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl text-white">{singleProduct.title}</h1>
        <DeleteBtn id={singleProduct.id}/>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct}/>
      </div>
   </div>
  );
};

export default SingleProductPage;