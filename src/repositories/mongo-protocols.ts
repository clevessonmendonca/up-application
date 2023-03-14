import { ProductsImages } from "../models/ProductsImages";

export type MongoImage = Omit<ProductsImages, "id">