import { ProductsImages } from "../../models/ProductsImages";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateImagesParams, ICreateImageRepository } from "./protocols";

export class CreateImageController implements IController {
  constructor(private readonly createImageRepository: ICreateImageRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateImagesParams>
  ): Promise<HttpResponse<ProductsImages>> {
    try {
      const requiredFields = ["name", "image"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateImagesParams]?.length) {
          return {
            statusCode: 400,
            body: `Missing required field ${field}`,
          };
        }
      }

      const image = await this.createImageRepository.createImage(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: image,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
