"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import CustomImage from "@/components/image";
import { ProductType } from "@/interface";

const ProductDetaliedPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  const handleClick = () => {
    const products: ProductType[] =
      JSON.parse(localStorage.getItem("cards") as string) || [];

    const isExistProduct = products.find((c) => c.id === product?.id);
    if (isExistProduct) {
      const updateDate = products.map((c) => {
        if (c.id === product?.id) {
          return {
            ...c,
            quantity: c.quantity + 1,
          };
        }
        return c;
      });
      localStorage.setItem("cards", JSON.stringify(updateDate));
    } else {
      const date = [...products, { ...product, quantity: 1 }];
      localStorage.setItem("cards", JSON.stringify(date));
    }
    toast("Product added to your bag!!");
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      setProduct(product);
      setLoading(false);
    }
    getData();
  }, [id]);
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">${product?.price}</p>

                    <div className="flex item-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <div className="flex item-center ml-2 mr-6">
                          {/* {Array.from({length: Math.floor(product.rating.rate)}, (_, i)=>(
                                <StarIcon key={i} className='w-4 h-4 text-yellow-500' />
                              ))}
                              {Array.from({length:5 - Math.floor(product.rating.rate)}, (_, i)=>(
                                <StarIconOutline key={i} className='w-4 h-4 text-yellow-500'/>
                              ))} */}
                          <ReactStars
                            value={product.rating.rate}
                            edit={false}
                          />
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count} review
                      </p>
                    </div>
                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full bg-blue-700 text-white border-transparent hover:border-blue-600 
                        hover:bg-transparent hover:text-blue-700"
                      onClick={handleClick}
                    >
                      Add to bag
                    </button>

                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-transpatent text-blue-700 border-blue-600 hover:border-transparent  
                      hover:bg-blue-700 hover:text-white"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetaliedPage;
