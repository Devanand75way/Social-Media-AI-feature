import { Router } from "express";
const router = Router();

import * as userController from "./user.controller";

router.post("/register", userController.registerUser)
    .post("/login", userController.loginuser)

export default router;