import { Router } from "express";
import doTasksRoutes from "./apis/doTasks";
import scheduleTasksRoutes from "./apis/scheduleTasks";
import delegateTasksRoutes from "./apis/delegateTasks";
import deleteTasksRoutes from "./apis/deleteTasks";
import questionsRoutes from "./apis/questions";

const router = Router();

router.use("/do", doTasksRoutes);
router.use("/schedule", scheduleTasksRoutes);
router.use("/delegate", delegateTasksRoutes);
router.use("/delete", deleteTasksRoutes);
router.use("/questions", questionsRoutes);

export default router;
