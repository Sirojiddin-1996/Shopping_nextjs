import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { ProductType } from "@/interface";
import CustomImage from "./image";

export const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div>
      <Link
        href={`/product/${product.id}`}
        className="h-96 flex flex-col bg-white border p-6 rounded-lg group hover:scale-105 transition-transform duration-200"
      >
        <div className="relative  flex-1 ">
          <CustomImage product={product} fill />
        </div>
        <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font mt-5">
          {product.category}
        </h3>
        <div className="flex items-center justify-between font-semibold text-black mt-4 mb-1">
          <h2 className="w-44 truncate">{product.title}</h2>
          <span>${product.price}</span>
        </div>
        <p className="leading-relaxed text-base text-gray-900 line-clamp-2">
          {product.description}
        </p>
      </Link>
    </div>
  );
};
