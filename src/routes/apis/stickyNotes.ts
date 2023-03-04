import { Router, Request, Response } from "express";
import { collections } from "../../database";
const routes = Router();
import { ObjectId } from "mongodb";
import StickyNoteType from "../../models/StickyNoteType";

routes.get("/", async (_req: Request, res: Response) => {
  try {
    const stickyNotes = await collections?.stickyNotes?.find().toArray();
    res.status(200).json(stickyNotes);
  } catch (error) {
    res.status(500).json(error);
  }
});
// routes.get("/:id", async (req: Request, res: Response) => {
//   const id = req?.params?.id;

//   try {
//     const query = { _id: new ObjectId(id) };
//     const stickyNote = await collections?.doStstickyNotes?.findOne(query);

//     if (stickyNote) res.status(200).send(stickyNote);
//   } catch (error) {
//     res
//       .status(404)
//       .send(`Unable to find matching document with id: ${req.params.id}`);
//   }
// });
routes.post("/", async (req: Request, res: Response) => {
  try {
    const stickyNote: StickyNoteType = req.body as StickyNoteType;
    const result = await collections?.stickyNotes?.insertOne(stickyNote);

    result
      ? res.status(201).json({ ...stickyNote, _id: result?.insertedId })
      : res.status(500).send("Failed to create a new stickyNote.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// routes.put("/:id", async (req: Request, res: Response) => {
//   const id = req?.params?.id;

//   try {
//     const updatedStickyNote: StickyNoteType = req.body as StickyNoteType;
//     const query = { _id: new ObjectId(id) };

//     const result = await collections?.doStstickyNotes?.updateOne(query, {
//       $set: updatedStickyNote,
//     });

//     result
//       ? res.status(200).send(`Successfully updated stickyNote with id ${id}`)
//       : res.status(304).send(`StickyNote with id: ${id} not updated`);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error);
//   }
// });
routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.stickyNotes?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed stickyNote with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove stickyNote with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`StickyNote with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// // experimental
// routes.delete("/", async (req, res) => {
//   await collections?.doStstickyNotes?.deleteMany({});
//   res.json("done");
// });
export default routes;
