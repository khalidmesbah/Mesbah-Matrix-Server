import { Router } from "express";
import doTasksRoutes from "./apis/doTasks";
import scheduleTasksRoutes from "./apis/scheduleTasks";
import delegateTasksRoutes from "./apis/delegateTasks";
import deleteTasksRoutes from "./apis/deleteTasks";
import questionsRoutes from "./apis/questions";
import remembersRoutes from "./apis/remembers";
import dailyTasksRoutes from "./apis/dailyTasks";
import stickyNotesRoutes from "./apis/stickyNotes";
import lovedQuotesRoutes from "./apis/lovedQuotes";
import lovedAyahsRoutes from "./apis/lovedAyahs";
import bookmarksRoutes from "./apis/bookmarks";

const router = Router();

router.use("/do", doTasksRoutes);
router.use("/schedule", scheduleTasksRoutes);
router.use("/delegate", delegateTasksRoutes);
router.use("/delete", deleteTasksRoutes);
router.use("/questions", questionsRoutes);
router.use("/remembers", remembersRoutes);
router.use("/tasks", dailyTasksRoutes);
router.use("/sticky-notes", stickyNotesRoutes);
router.use("/loved-quotes", lovedQuotesRoutes);
router.use("/loved-ayahs", lovedAyahsRoutes);
router.use("/bookmarks", bookmarksRoutes);

export default router;
