import { Router } from "express";
import { userController } from "../controllers/user/userController";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.post("/auth", userController.authUser);

export default userRouter;
