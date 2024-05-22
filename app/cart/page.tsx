"use client";
import Image from "next/image";
import React from "react";
import { useCartStore } from "../utils/store";
import { useEffect } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);


  return (
    <div className="h-[calc(100vh-3rem)] md:h-[calc(100vh-6rem)] flex flex-col text-green-600 lg:flex-row bg-zinc-900">
      {/* PRODUCTS CONTAINER */}
      <div className="p-6 flex flex-col justify-center overflow-y-scroll w-full lg:p-10">
        {/* SINGLE ITEM */}
        {products.map((item) => (
           <div className="flex items-center justify-between mb-4" key={item.id}>
           {item.img && <Image src="/assets/pizza.png" alt="" width={100} height={100} className="w-[4rem] sm:w-[6.5rem]"/>}
           <div>
             <h1 className="uppercase sm:text-xl font-bold text-white">{item.title} - {item.quantity}</h1>
             <span>{item.optionTitle}</span>
           </div>
           <h2 className="font-bold">${item.price}</h2>
           <span className="cursor-pointer" onClick={() => removeFromCart(item)}>X</span>
         </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="p-6 bg-zinc-900 flex flex-col gap-4 justify-center w-full lg:px-[10rem] ">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-blue-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL(INCL. VAT)</span>
          <span className="font-bold text-white">${totalPrice}</span>
        </div>
        <button className="bg-green-600 text-white p-3 rounded-md w-1/2 self-end">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;