import { Router, Request, Response } from "express";
import { collections } from "../../database";
const routes = Router();
import { ObjectId } from "mongodb";
import RememberType from "../../models/RememberType";

routes.get("/", async (_req: Request, res: Response) => {
  try {
    const remembers = await collections?.remembers?.find().toArray();
    console.log("from remembers");
    res.status(200).json(remembers);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.get("/new", async (_req: Request, res: Response) => {
  try {
    await collections?.remembers?.updateMany({}, { $set: { done: false } });
    console.log("new from remembers");
    const remembers = await collections?.remembers?.find().toArray();
    res.status(200).json(remembers);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.post("/", async (req: Request, res: Response) => {
  try {
    const remember: RememberType = req.body as RememberType;
    const result = await collections?.remembers?.insertOne(remember);

    result
      ? res.status(201).json({ ...remember, _id: result?.insertedId })
      : res.status(500).send("Failed to create a new remember.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

routes.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const remember = await collections?.remembers?.findOne(query);
    const updatedRemember = { done: !remember?.done };

    const result = await collections?.remembers?.updateOne(query, {
      $set: updatedRemember,
    });

    result
      ? res.status(200).send(`Successfully updated remember with id ${id}`)
      : res.status(304).send(`Remember with id: ${id} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.remembers?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed remember with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove remember with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Remember with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// // experimental
// routes.delete("/", async (req, res) => {
//   await collections?.doRemembers?.updateMany({});
//   res.json("done");
// });

export default routes;
