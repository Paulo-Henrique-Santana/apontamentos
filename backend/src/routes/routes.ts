import express from 'express';
import { authenticateToken } from '../middlewares/auth';
import projectRouter from './projectRoutes';
import timeEntrieRouter from './timeEntriesRoutes';
import userRouter from './userRoutes';

const router = express.Router();

router.use("/users", userRouter);
router.use("/projects", authenticateToken, projectRouter);
router.use("/time-entries", authenticateToken, timeEntrieRouter);

export default router;