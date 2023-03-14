import { ProductsImages } from "../../models/ProductsImages";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateImagesParams, ICreateImageRepository } from "./protocols";

export class CreateImageController implements IController {
  constructor(private readonly createImageRepository: ICreateImageRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateImagesParams>
  ): Promise<HttpResponse<ProductsImages | string>> {
    try {
      const requiredFields = ["name", "image"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateImagesParams]?.length) {
          return badRequest(`Missing required field ${field}`);
        }
      }

      const image = await this.createImageRepository.createImage(
        httpRequest.body!
      );

      return created<ProductsImages>(image);
    } catch (error) {
      return serverError();
    }
  }
}
