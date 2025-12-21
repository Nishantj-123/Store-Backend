import express from "express";
import { 
    createSetting,
    getSetting,
    deleteSetting } from "../controller/SettingController.js";

    const router = express.Router();

    router.post("/post", createSetting);
    router.get("/get", getSetting);
    router.delete("/delete/:id", deleteSetting);

    export default router;