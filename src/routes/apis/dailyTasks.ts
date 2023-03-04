import { Router, Request, Response } from "express";
import { collections } from "../../database";
const routes = Router();
import { ObjectId } from "mongodb";
import DailyTaskType from "../../models/DailyTaskType";

routes.get("/", async (_req: Request, res: Response) => {
  try {
    const tasks = await collections?.dailyTasks?.find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.get("/new", async (_req: Request, res: Response) => {
  try {
    await collections?.dailyTasks?.updateMany({}, { $set: { done: false } });
    const tasks = await collections?.dailyTasks?.find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.post("/", async (req: Request, res: Response) => {
  try {
    const task: DailyTaskType = req.body as DailyTaskType;
    const result = await collections?.dailyTasks?.insertOne(task);

    result
      ? res.status(201).json({ ...task, _id: result?.insertedId })
      : res.status(500).send("Failed to create a new task.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

routes.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const task = await collections?.dailyTasks?.findOne(query);
    const updatedTask = { done: !task.done };

    const result = await collections?.dailyTasks?.updateOne(query, {
      $set: updatedTask,
    });

    result
      ? res.status(200).send(`Successfully updated task  with id ${id}`)
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
    const result = await collections?.dailyTasks?.deleteOne(query);

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

// // experimental
// routes.delete("/", async (req, res) => {
//   await collections?.doDailyTasks?.updateMany({});
//   res.json("done");
// });

export default routes;
