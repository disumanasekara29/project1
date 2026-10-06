import express from "express"
import { createStudent,getstudents } from "../controllers/studentController.js";

const studentRouter=express.Router()

studentRouter.get("/",getstudents)
studentRouter.post("/",createStudent)

export default studentRouter
