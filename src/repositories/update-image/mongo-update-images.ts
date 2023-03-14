import { ObjectId } from "mongodb";
import {
  IUpdateImageRepository,
  UpdateImageParams,
} from "../../controllers/update-images/protocols";
import { MongoClient } from "../../database/mongo";
import { ProductsImages } from "../../models/ProductsImages";
import { MongoImage } from "../mongo-protocols";

export class MongoUpdateImageRepository implements IUpdateImageRepository {
  async updateImage(
    id: string,
    params: UpdateImageParams
  ): Promise<ProductsImages> {
    await MongoClient.db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );
    const image = await MongoClient.db
      .collection<MongoImage>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!image) throw new Error("Image not updated");

    const { _id, ...rest } = image;

    return { id: _id.toHexString(), ...rest };
  }
}
