"use client";

import React, { useEffect, useState } from "react";
import { ProductType } from "../types/types";


const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (product.options?.length) {
      setTotal(
        quantity * (+product.price + product.options[selected].additionalPrice)
      );
    } else {
      setTotal(quantity * product.price)
    }
  }, [quantity, selected, product]);


  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="text-2xl font-bold text-white">${total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length ? product.options?.map((option, index) => (
          <button
            key={option.title}
            className="w-[5rem] sm:w-[6rem] p-2 ring-1 ring-green-600 rounded-md"
            style={{
              background: selected === index ? "rgb(22 163 74)" : "white",
              color: selected === index ? "white" : "rgb(22 163 74)",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        )) : ""}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-green-600">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="uppercase w-[10rem] h-[3rem] text-xs sm:text-base sm:w-56 bg-green-600 text-white p-3 ring-1 ring-green-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;