import { Router } from "express";
import { celebrate } from "celebrate";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from "../controllers/authController.js";

import {
  registerUserSchema,
  loginUserSchema,
 } from "../validations/authValidation.js";

const router = Router();
router.post('/.auth/register', celebrate(registerUserSchema), registerUser);
router.post('/.auth/login', celebrate(loginUserSchema), loginUser);
router.pors('/.auth/logout', logoutUser);
router.pors('/.auth/refresh', refreshUserSession);

export default router;
