import CustomImage from "@/components/image";
import { notFound } from "next/navigation";
import React from "react";
import ReactStars from "react-stars";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetaliedPage = async ({ params: { id } }: Props) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    return (
      <div className="max-w-7xl mx-auto px-8 xl:px-0 flex flex-col md:flex-row items-center gap-8 mt-20 pb-10">
        <CustomImage product={product} />

        <div className="divide-2">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </h2>
          </div>
          <div className="pt-8">
            <p className="text-xs md:text-sm">{product.description}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default ProductDetaliedPage;
