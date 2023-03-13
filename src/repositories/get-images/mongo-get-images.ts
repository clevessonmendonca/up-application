import { IGetImagesRepository } from "../../controllers/get-images/protocols";
import { ProductsImages } from "../../models/ProductsImages";

export class MongoGetImagesRepository implements IGetImagesRepository {
  async getImages(): Promise<ProductsImages[]> {
    return await [
      { name: "Salsicha", image: "Salcicha.png", producer: "Sadia" },
    ];
  }
}
