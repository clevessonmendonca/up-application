import express from "express";
import { config } from "dotenv";
import { GetImagesController } from "./controllers/get-images/get-images";
import { MongoGetImagesRepository } from "./repositories/get-images/mongo-get-images";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get("/images", async (req, res) => {
    const getImagesRepository = new MongoGetImagesRepository();
    const getImagesController = new GetImagesController(getImagesRepository);

    const { body, statusCode } = await getImagesController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 3333;

  app.listen(port, () => console.log("listening on port 3333"));
};

main();
