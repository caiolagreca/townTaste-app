import { Router } from "express";
import {
  deleteUser,
  fetchUser,
  login,
  signup,
  updatePassword,
  updateUser,
} from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", errorHandler(login));
authRoutes.post("/forgot-password", errorHandler(forgotPassword));
authRoutes.post("/reset-password/:token", errorHandler(resetPassword));

authRoutes.use(authMiddleware);

authRoutes.get("/profile", errorHandler(fetchUser));
authRoutes.patch("/profile", errorHandler(updateUser)); //PATCH: Used for making partial updates to a resource.
authRoutes.delete("/profile", errorHandler(deleteUser));
authRoutes.post("/change-password", errorHandler(updatePassword));

export default authRoutes;
