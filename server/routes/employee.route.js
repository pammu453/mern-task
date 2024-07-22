import express from 'express'
import { createEmployee, getEmployees, deleteEmployee, getEmployee, updateEmployee } from '../controllers/employee.controller.js'

const router = express.Router()

router.post("/createEmployee", createEmployee)
router.post("/getEmployees", getEmployees)
router.delete("/deleteEmployee/:id", deleteEmployee)
router.get("/getEmployee/:id", getEmployee)
router.put("/updateEmployee/:id", updateEmployee)

export default router