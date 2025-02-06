// 'use client';

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { Star, ShoppingCart, Truck } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { fetchProduct } from "@/actions/Product";

// interface Product {
//   id: number;
//   title: string;
//   category: string;
//   image: string;
//   price: number;
//   rating: number;
//   inStock: boolean;
//   isAvailable: boolean;
//   isRentable: boolean;
// }

// interface ProductCardProps {
//   product: Product;
// }

// function ProductCard({ product }: ProductCardProps) {
//   const { addToCart, removeFromCart, isInCart } = useCart();

//   const handleCartAction = () => {
//     if (isInCart(product.id)) {
//       removeFromCart(product.id);
//     } else {
//       addToCart(product);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden transition-opacity duration-500">
//       <Image
//         src={product.image || "/placeholder.svg"}
//         alt={product.title}
//         width={300}
//         height={200}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <span className="text-sm text-green-600 font-semibold">
//           {product.category}
//         </span>
//         <h2 className="text-xl font-bold mt-1">{product.title}</h2>
//         <div className="flex items-center mt-2">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               size={16}
//               className={
//                 i < Math.floor(product.rating || 0)
//                   ? "text-yellow-400 fill-current"
//                   : "text-gray-300"
//               }
//             />
//           ))}
//           <span className="ml-2 text-sm text-gray-600">
//             {(product.rating || 0).toFixed(1)}
//           </span>
//         </div>
//         <div className="mt-2">
//           {product.inStock ? (
//             <span className="text-green-600 font-semibold">In Stock</span>
//           ) : product.isAvailable ? (
//             <span className="text-blue-600 font-semibold">Available</span>
//           ) : (
//             <span className="text-red-600 font-semibold">Available</span>
//           )}
//         </div>
//         <div className="mt-4 flex justify-between items-center">
//           <span className="text-2xl font-bold text-green-700">
//             ${product.price.toFixed(2)}
//           </span>
//           <button
//             onClick={handleCartAction}
//             className={`px-4 py-2 rounded-full flex items-center ${
//               isInCart(product.id)
//                 ? "bg-red-500 hover:bg-red-600 text-white"
//                 : "bg-green-500 hover:bg-green-600 text-white"
//             }`}
//           >
//             {product.isRentable ? (
//               <Truck size={20} className="mr-2" />
//             ) : (
//               <ShoppingCart size={20} className="mr-2" />
//             )}
//             {isInCart(product.id)
//               ? product.isRentable
//                 ? "Cancel Rent"
//                 : "Remove"
//               : product.isRentable
//               ? "Rent"
//               : "Add to Cart"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export  default function Products() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const fetchedProducts = await fetchProduct();
//         setProducts(fetchedProducts); // Save fetched products to state
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     loadProducts();
//   }, []);

//   return (
//     <section className="py-12">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold mb-8 text-center text-green-800 logo-font">
//           Shop by Products
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

















import { fetchCategory } from '@/actions/Category';
import { fetchProduct } from '@/actions/House';
import { ShoppingCart, Star } from 'lucide-react';
 import Image from 'next/image';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
 
 interface Product {
     id: string;
     title: string;
     categoryTitle:string;
     image: string;
     price: number;
  }
 
  interface ProductCardProps {
       product: Product;
     }
 
 
 
 // ********************************
 //  The Container of Product Card *********
 // ********************************
 export default async function Categories() {
   const products: Product[] = await fetchProduct();
   console.log(products)
 console.log(products)
   return (
     <section className="py-12 bg-green-50">
       <div className="w-full p-4">
       <h2 className="text-3xl font-bold mb-8 text-center text-green-800 logo-font">
           Shop by Products
       </h2>
         <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 logo-font">
           {products.length > 0 ? (
            products.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))
           ) : (
             <p className="text-gray-500 text-center col-span-full">No categories available.</p>
           )}
         </div>
       </div>
     </section>
   );
 }
 
 
 // ********************************
 //  The Actual Category Card *********
 // ********************************
 function ProductCard({ product }: ProductCardProps) {

   return (
     <div className=" rounded-lg shadow-md overflow-hidden transition-opacity duration-500 opacity-100 p-2 bg-white">
       <div className='w-full flex items-center justify-center h-[47vh]  p-2 bg-green'>
       <Image
        src={product.image || "/placeholder.svg"}
         alt={product.title}
        width={300}
        height={200}
         className="w-full h-48 object-cover"
       />
       </div>
       <div className='w-[100%] min-h-[20vh] px-3'>
        {/* type of category the product belongs */}
       <div className="w-full min-h-[5vh]">
         <h3 className="text-sm text-green-600 font-semibold">{product.categoryTitle}</h3>
       </div>
       <div className="w-full min-h-[5vh]">
         <h3 className="text-lg font-semibold text-green-900">{product.title}</h3>
       </div>
       {/* //Review stars */}
       <div className="p-4 w-full flex gap-2">
        <h3 className="text-md font-semibold text-amber-800">Rating</h3>
       {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
       </div>
       {/* <div className="p-4 w-full bg-blue-500">
       
       </div> */}

       </div>
      
     </div>
   );
 }
 
 