import { ProductsImages } from "../../models/ProductsImages";
import { HttpResponse } from "../protocols";

export interface IGetImagesController {
  handle(): Promise<HttpResponse<ProductsImages[]>>;
}

export interface IGetImagesRepository {
  getImages(): Promise<ProductsImages[]>;
}
