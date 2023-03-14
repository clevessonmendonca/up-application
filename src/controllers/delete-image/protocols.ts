import { ProductsImages } from "../../models/ProductsImages";

export interface IDeleteImageRepository {
  deleteImage(id: string): Promise<ProductsImages>;
}
