import { Router } from "express";
import { signupUser } from "../controllers/user.controller";
import { loginUser } from "../controllers/auth.controller";

const user_router = Router();

user_router.post('/signup', signupUser);
user_router.post('/login', loginUser)

export default user_router;
