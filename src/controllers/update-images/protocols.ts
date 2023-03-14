import { ProductsImages } from "../../models/ProductsImages";

export interface UpdateImageParams {
  name?: string;
  image?: string;
  producer?: string;
}

export interface IUpdateImageRepository {
  updateImage(id: string, params: UpdateImageParams): Promise<ProductsImages>;
}
