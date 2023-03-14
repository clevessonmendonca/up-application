import { ProductsImages } from "../../models/ProductsImages";

export interface IGetImagesRepository {
  getImages(): Promise<ProductsImages[]>;
}
