import { Router } from "express";
import { premiumRole } from "../controllers/user.controller.js";

const usersRoutes = Router();

usersRoutes.get('/premium', premiumRole)


export default usersRoutes;
