import { IGetImagesRepository } from "../../controllers/get-images/protocols";
import { MongoClient } from "../../database/mongo";
import { ProductsImages } from "../../models/ProductsImages";

export class MongoGetImagesRepository implements IGetImagesRepository {
  async getImages(): Promise<ProductsImages[]> {
    const ProductImages = await MongoClient.db
      .collection<Omit<ProductsImages, "id">>("products")
      .find({})
      .toArray();

    return ProductImages.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
