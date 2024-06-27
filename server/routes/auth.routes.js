import express from "express"
const router= express.Router();
import {signin,login,logout} from  "../controllers/auth.controller.js"
router.post("/sigup",signin)
router.post("/login",login)
router.post("/logout",logout)

export default router