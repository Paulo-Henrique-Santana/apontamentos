import { Router } from "express";
import { userController } from "../controllers/user/userController";

const userRouter = Router();

userRouter.post("/", userController.createUser);

export default userRouter;
