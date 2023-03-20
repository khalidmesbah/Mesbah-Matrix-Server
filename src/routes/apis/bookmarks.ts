import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../../database";
import Bookmark from "../../models/Bookmark";
const routes = Router();
// get bookmarks
routes.get("/", async (_req: Request, res: Response) => {
  try {
    const bookmarks = await collections?.bookmarks.find().toArray();
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get a specific bookmark
routes.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const bookmark = await collections?.bookmarks?.findOne(query);

    if (bookmark) res.status(200).send(bookmark);
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});
// add a bookmark if not exist
routes.post("/", async (req: Request, res: Response) => {
  try {
    const bookmark: Bookmark = req.body as Bookmark;
    const result = await collections?.bookmarks?.insertOne(bookmark);

    result
      ? res.status(201).json({ ...bookmark, _id: result?.insertedId })
      : res.status(500).send("Failed to create a bookmark.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// update a bookmark
routes.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedBookmark: Bookmark = req.body as Bookmark;
    const query = { _id: new ObjectId(id) };

    const result = await collections?.bookmarks?.updateOne(query, {
      $set: updatedBookmark,
    });

    result
      ? res.status(200).send(`Successfully updated bookmark with id ${id}`)
      : res.status(304).send(`Bookmark with id: ${id} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// delete a bookmark
routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.bookmarks?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed bookmark with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove bookmark with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Bookmark with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
export default routes;
