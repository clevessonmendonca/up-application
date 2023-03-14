import { ProductsImages } from "../../models/ProductsImages";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteImageController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<ProductsImages>>;
}

export interface IDeleteImageRepository {
  deleteImage(id: string): Promise<ProductsImages>;
}
