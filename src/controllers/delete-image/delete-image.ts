import { ProductsImages } from "../../models/ProductsImages";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteImageRepository } from "./protocols";

export class DeleteImageController implements IController {
  constructor(private readonly deleteImageRepository: IDeleteImageRepository) {}

  async handle(
    httpRequest: HttpRequest<ProductsImages>
  ): Promise<HttpResponse<ProductsImages | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) return badRequest("Missing product id");

      const image = await this.deleteImageRepository.deleteImage(id);

      return ok<ProductsImages>(image);
    } catch (error) {
      return serverError();
    }
  }
}
