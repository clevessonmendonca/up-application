import { ProductsImages } from "../../models/ProductsImages";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateImageParams {
  name?: string;
  image?: string;
  producer?: string;
}

export interface IUpdateImageController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<ProductsImages>>;
}

export interface IUpdateImageRepository {
  updateImage(id: string, params: UpdateImageParams): Promise<ProductsImages>;
}
