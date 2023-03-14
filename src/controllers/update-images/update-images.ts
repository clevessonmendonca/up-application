import { ProductsImages } from "../../models/ProductsImages";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateImageRepository, UpdateImageParams } from "./protocols";

export class UpdateImageController implements IController {
  constructor(private readonly updateImageRepository: IUpdateImageRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateImageParams>
  ): Promise<HttpResponse<ProductsImages | string>> {
    const id = httpRequest?.params?.id;
    const body = httpRequest?.body;

    try {
      if (!id) return badRequest("Missing Image ID");
      const image = await this.updateImageRepository.updateImage(id, body!);

      return ok<ProductsImages>(image);
    } catch (error) {
      return serverError();
    }
  }
}
