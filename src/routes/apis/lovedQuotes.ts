import { Router, Request, Response } from "express";
import { collections } from "../../database";
const routes = Router();
import { ObjectId } from "mongodb";
import LovedQuoteType from "../../models/LovedQuoteType";

routes.get("/", async (_req: Request, res: Response) => {
  try {
    const lovedQuotes = await collections?.lovedQuotes?.find().toArray();
    console.log(`lovedQuotes==>`, lovedQuotes);
    res.status(200).json(lovedQuotes);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.post("/", async (req: Request, res: Response) => {
  try {
    const lovedQuote: LovedQuoteType = req.body as LovedQuoteType;
    const result = await collections?.lovedQuotes?.insertOne(lovedQuote);

    result
      ? res.status(201).json({ ...lovedQuote, _id: result?.insertedId })
      : res.status(500).send("Failed to create a new lovedQuote.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.lovedQuotes?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed lovedQuote with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove lovedQuote with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`LovedQuote with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default routes;
