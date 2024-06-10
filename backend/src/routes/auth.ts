import { Router } from "express";
import {
  deleteUser,
  fetchUser,
  login,
  requestPasswordReset,
  resetPassword,
  signup,
  updatePassword,
  updateUser,
} from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { checkLoginAttempts } from "../middlewares/checkLoginAttempts";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", checkLoginAttempts, errorHandler(login));
authRoutes.post("/forgot-password", errorHandler(requestPasswordReset));
authRoutes.post("/reset-password", errorHandler(resetPassword));

authRoutes.use(authMiddleware);

authRoutes.get("/profile", errorHandler(fetchUser));
authRoutes.patch("/profile", errorHandler(updateUser)); //PATCH: Used for making partial updates to a resource.
authRoutes.delete("/profile", errorHandler(deleteUser));
authRoutes.post("/change-password", errorHandler(updatePassword));

export default authRoutes;
