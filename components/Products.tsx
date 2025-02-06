import { fetchProduct } from '@/actions/Product';
import {Star } from 'lucide-react';
import Image from 'next/image';

 
 interface Productt {
  id: string;
  title: string;
  categoryTitle: string;
  categoryId: string;
  price: number;
  image: string;
  slug: string;
  }

  
 
  interface ProductCardProps {
       product: Productt;
     }
 
 
 
 // ********************************
 //  The Container of Product Card *********
 // ********************************
 export default async function Products() {
   const products: Productt[] = await fetchProduct();
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
             <p className="text-gray-500 text-center col-span-full">No Products available.</p>
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
       <div className="w-full min-h-[5vh]">
         <h3 className="text-lg font-semibold text-green-900">{product.price}</h3>
       </div>
       {/* <div className="p-4 w-full bg-blue-500">
       
       </div> */}

       </div>
      
     </div>
   );
 }
 
 