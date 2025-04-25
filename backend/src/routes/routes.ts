import express from 'express';
import projectRouter from './projectRoutes';
import userRouter from './userRoutes';

const router = express.Router();

router.use("/users", userRouter);
router.use("/projects", projectRouter);

export default router;