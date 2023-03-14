import { ProductsImages } from "../../models/ProductsImages";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateImageController,
  IUpdateImageRepository,
  UpdateImageParams,
} from "./protocols";

export class UpdateImageController implements IUpdateImageController {
  constructor(private readonly updateImageRepository: IUpdateImageRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<ProductsImages>> {
    const id = httpRequest?.params?.id;
    const body = httpRequest?.body;

    try {
      if (!id)
        return {
          statusCode: 400,
          body: "Missing Image ID",
        };
      const image = await this.updateImageRepository.updateImage(id, body);

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
