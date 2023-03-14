import { ProductsImages } from "../../models/ProductsImages";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetImagesRepository } from "./protocols";

export class GetImagesController implements IController {
  constructor(private readonly getImagesRepository: IGetImagesRepository) {}

  async handle(): Promise<HttpResponse<ProductsImages[] | string>> {
    try {
      const images = await this.getImagesRepository.getImages();

      return ok<ProductsImages[]>(images);
    } catch (error) {
      return serverError();
    }
  }
}
