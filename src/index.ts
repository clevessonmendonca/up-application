import express from "express";
import { config } from "dotenv";
import { GetImagesController } from "./controllers/get-images/get-images";
import { MongoGetImagesRepository } from "./repositories/get-images/mongo-get-images";
import { MongoClient } from "./database/mongo";
import { CreateImageController } from "./controllers/create-image/create-image";
import { MongoCreateImageRepository } from "./repositories/create-image/mongo-create-images";
import { MongoUpdateImageRepository } from "./repositories/update-image/mongo-update-images";
import { UpdateImageController } from "./controllers/update-images/update-images";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/images", async (req, res) => {
    const getImagesRepository = new MongoGetImagesRepository();
    const getImagesController = new GetImagesController(getImagesRepository);

    const { body, statusCode } = await getImagesController.handle();

    res.send(body).status(statusCode);
  });

  app.post("/images", async (req, res) => {
    const mongoCreateImageRepository = new MongoCreateImageRepository();
    const createImageController = new CreateImageController(
      mongoCreateImageRepository
    );

    const { body, statusCode } = await createImageController.handle({
      body: req.body,
    });

    res.send(body).status(statusCode);
  });

  app.patch("/images/:id", async (req, res) => {
    const mongoUpdateImageRepository = new MongoUpdateImageRepository();
    const updateImageController = new UpdateImageController(
      mongoUpdateImageRepository
    );

    const { body, statusCode } = await updateImageController.handle({
      body: req.body,
      params: req.params,
    });

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 3333;

  app.listen(port, () => console.log("listening on port 3333"));
};

main();
