import { User } from "@prisma/client";
import express, { Request } from "express";

declare module "express" {
  export interface Request {
    user: User;
  }
}
