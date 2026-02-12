import express from "express";

import {
    registerUser,
    loginUser,
    getUsersProfile,
    updateUsersProfile,
    deleteUsersProfile
} from "../controller/UserController.js";

import verifyToken from "../middleware/Verifytoken.js";

const router = express.Router();

// Public routes
router.post("/register",registerUser);
router.post("/login", loginUser);

// Private routes (user must be logged in)
router.get("/get",verifyToken,getUsersProfile);
router.put("/put",verifyToken,updateUsersProfile);
router.delete("/delete/:id",verifyToken,deleteUsersProfile);

export default router;