"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const user_router = (0, express_1.Router)();
user_router.post('/signup', user_controller_1.signupUser);
user_router.post('/login', auth_controller_1.loginUser);
exports.default = user_router;
