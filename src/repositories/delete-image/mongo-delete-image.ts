import { ObjectId } from "mongodb";
import { IDeleteImageRepository } from "../../controllers/delete-image/protocols";
import { MongoClient } from "../../database/mongo";
import { ProductsImages } from "../../models/ProductsImages";
import { MongoImage } from "../mongo-protocols";

export class MongoDeleteImageRepository implements IDeleteImageRepository {
  async deleteImage(id: string): Promise<ProductsImages> {
    const image = await MongoClient.db
      .collection<MongoImage>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!image) throw new Error(`Image ${id} not found`);

    const { deletedCount } = await MongoClient.db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) throw new Error(`Image not deleted`);

    const { _id, ...rest } = image;

    return { id: _id.toHexString(), ...rest };
  }
}
