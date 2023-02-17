import { Router, Request, Response } from "express";
import { collections } from "../../database";
const routes = Router();
import { ObjectId } from "mongodb";
import QuestionType from "../../models/QuestionType";

routes.get("/", async (_req: Request, res: Response) => {
  try {
    const questions = await collections?.questions?.find().toArray();
    console.log(`questions==>`, questions);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error);
  }
});
// routes.get("/:id", async (req: Request, res: Response) => {
//   const id = req?.params?.id;

//   try {
//     const query = { _id: new ObjectId(id) };
//     const question = await collections?.doQuestions?.findOne(query);

//     if (question) res.status(200).send(question);
//   } catch (error) {
//     res
//       .status(404)
//       .send(`Unable to find matching document with id: ${req.params.id}`);
//   }
// });
routes.post("/", async (req: Request, res: Response) => {
  try {
    const question: QuestionType = req.body as QuestionType;
    const result = await collections?.questions?.insertOne(question);

    result
      ? res.status(201).json({ ...question, _id: result?.insertedId })
      : res.status(500).send("Failed to create a new question.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// routes.put("/:id", async (req: Request, res: Response) => {
//   const id = req?.params?.id;

//   try {
//     const updatedQuestion: QuestionType = req.body as QuestionType;
//     const query = { _id: new ObjectId(id) };

//     const result = await collections?.doQuestions?.updateOne(query, {
//       $set: updatedQuestion,
//     });

//     result
//       ? res.status(200).send(`Successfully updated question with id ${id}`)
//       : res.status(304).send(`Question with id: ${id} not updated`);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error);
//   }
// });
routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.questions?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed question with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove question with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Question with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// // experimental
// routes.delete("/", async (req, res) => {
//   await collections?.doQuestions?.deleteMany({});
//   res.json("done");
// });
export default routes;
