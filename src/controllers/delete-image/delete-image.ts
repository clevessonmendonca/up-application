import { ProductsImages } from "../../models/ProductsImages";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteImageController, IDeleteImageRepository } from "./protocols";

export class DeleteImageController implements IDeleteImageController {
  constructor(private readonly deleteImageRepository: IDeleteImageRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<ProductsImages>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id)
        return {
          statusCode: 400,
          body: "Missing id",
        };

      const image = await this.deleteImageRepository.deleteImage(id);

      return {
        statusCode: 200,
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
