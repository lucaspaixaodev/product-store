import { Product } from "./product.interface";

export type ProductPayLoad = Omit<Product, 'id'>
