import { IGetImagesController } from "./protocols";

export class GetImagesController implements IGetImagesController {
  constructor(private readonly getImagesRepository: IGetImagesRepository) {}

  handle() {
    try {
      const images = this.getImagesRepository.getImages();

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
