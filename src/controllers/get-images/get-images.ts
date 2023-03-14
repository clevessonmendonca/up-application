import { IController } from "../protocols";
import { IGetImagesRepository } from "./protocols";

export class GetImagesController implements IController {
  constructor(private readonly getImagesRepository: IGetImagesRepository) {}

  async handle() {
    try {
      const images = await this.getImagesRepository.getImages();

      return {
        statusCode: 200,
        body: images,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
