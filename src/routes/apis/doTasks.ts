import { Router, Request, Response } from "express";
import { collections } from "../../database";
const routes = Router();
import { ObjectId } from "mongodb";
import TaskType from "../../models/TaskType";

routes.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks = await collections?.doTasks?.find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});
routes.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const task = await collections?.doTasks?.findOne(query);

    if (task) res.status(200).send(task);
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});
routes.post("/", async (req: Request, res: Response) => {
  try {
    const newTask: TaskType = req.body as TaskType;
    const result = await collections?.doTasks?.insertOne(newTask);

    result
      ? res.status(201).json({ ...newTask, _id: result?.insertedId })
      : res.status(500).send("Failed to create a new task.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
routes.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedTask: TaskType = req.body as TaskType;
    const query = { _id: new ObjectId(id) };

    const result = await collections?.doTasks?.updateOne(query, {
      $set: updatedTask,
    });

    result
      ? res.status(200).send(`Successfully updated task with id ${id}`)
      : res.status(304).send(`Task with id: ${id} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
routes.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.doTasks?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed task with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove task with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Task with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
// experimental
routes.delete("/", async (req, res) => {
  await collections?.doTasks?.deleteMany({});
  res.json("done");
});
export default routes;
