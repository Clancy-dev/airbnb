// "use server"

// import { ProductProps } from "@/components/Forms/ProductForm";
// import { db } from "@/prisma/db";

// export async function createNewProduct(data:ProductProps){
//   try {
//     const createdNewProduct = await db.product.create({
//       data
//     })
//     console.log(createNewProduct)
//     return createdNewProduct
//   } catch (error) {
//     console.log(error)
//    return {
//     error
//    }
//   }

// }



// export async function fetchProduct() {
//   try {
//     const fetchedProducts = await db.product.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return fetchedProducts.map((product) => ({
//       id: product.id,
//       title: product.title || "Unnamed Product",
//       category: product.category,
//       image: product.image || "/placeholder.svg",
//       price: product.price || 0,
//       // rating: product.rating || 0,
//     }));
//   } catch (error) {
//     console.error(error);
//     return []; // Return an empty array on failure
//   }
// }








