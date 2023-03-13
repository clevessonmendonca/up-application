import { MongoClient } from "../../database/mongo";
import { ProductsImages } from "../../models/ProductsImages";
import { CreateImagesParams, ICreateImageRepository } from "./protocols";

export class MongoCreateImage implements ICreateImageRepository {
  async createImage(params: CreateImagesParams): Promise<ProductsImages> {
    const { insertedId } = await MongoClient.db
      .collection("productsImages")
      .insertOne(params);

    const images = await MongoClient.db
      .collection<Omit<ProductsImages, "id">>("productsImages")
      .findOne({ _id: insertedId });

    if (!images) throw new Error(`Images not created`);

    const { _id, ...rest } = images;

    return { id: _id.toHexString(), ...rest };
  }
}
