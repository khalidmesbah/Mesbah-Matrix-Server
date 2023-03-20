import { Router, Request, Response } from "express";
import { collections } from "../../database";
const routes = Router();
// get loved ayahs
routes.get("/", async (_req: Request, res: Response) => {
  try {
    const lovedAyahs = await collections?.lovedAyahs?.find().toArray();
    res.status(200).json(lovedAyahs);
  } catch (error) {
    res.status(500).json(error);
  }
});
// add a loved ayah if not exist
routes.post("/:surah/:ayah", async (req: Request, res: Response) => {
  try {
    const { surah, ayah } = req.params;
    const result = await collections?.lovedAyahs?.updateOne(
      { surah },
      { $addToSet: { ayahs: ayah } }
    );
    result
      ? res
          .status(200)
          .send(`Successfully added surah with ayah number ${ayah}`)
      : res
          .status(304)
          .send(`Surah with ayah number ${ayah} has not been added`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// delete a loved ayah
routes.delete("/:surah/:ayah", async (req: Request, res: Response) => {
  try {
    const { surah, ayah } = req.params;
    const result = await collections?.lovedAyahs?.updateOne(
      { surah },
      { $pull: { ayahs: ayah } }
    );
    result
      ? res
          .status(200)
          .send(`Successfully deleted surah with ayah number ${ayah}`)
      : res
          .status(304)
          .send(`Surah with ayah number ${ayah} has not been deleted`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default routes;
