import { ProductsImages } from "../../models/ProductsImages";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateImageController {
  handle(
    httpRequest: HttpRequest<CreateImagesParams>
  ): Promise<HttpResponse<ProductsImages>>;
}

export interface CreateImagesParams {
  id: string;
  name: string;
  image: string;
  producer?: string;
}

export interface ICreateImageRepository {
  createImage(params: CreateImagesParams): Promise<ProductsImages>;
}
