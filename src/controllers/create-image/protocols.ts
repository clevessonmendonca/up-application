import { ProductsImages } from "../../models/ProductsImages";

export interface CreateImagesParams {
  id: string;
  name: string;
  image: string;
  producer?: string;
}

export interface ICreateImageRepository {
  createImage(params: CreateImagesParams): Promise<ProductsImages>;
}
