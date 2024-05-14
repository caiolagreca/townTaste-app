import { Router } from "express";
import {
  deleteUser,
  fetchUser,
  login,
  me,
  signup,
  updateUser,
} from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/me", [authMiddleware], errorHandler(me));
authRoutes.get("/profile", [authMiddleware], errorHandler(fetchUser));
authRoutes.patch("/profile", [authMiddleware], errorHandler(updateUser)); //PATCH: Used for making partial updates to a resource.
authRoutes.delete("/profile", [authMiddleware], errorHandler(deleteUser));

export default authRoutes;
