import {Router} from "express";
import {StudentController} from "../controllers/student.controller";

export const router = Router();

router.get("/create",StudentController.getCreateNewStudentPage);
router.post("/create",StudentController.createNewStudent);
router.get("/list",StudentController.getListStudentsPage);
router.post("/list",StudentController.getListStudentsPage);
router.get("/:id/detail/",StudentController.getDeailStudent);
router.get("/:id/update/",StudentController.getUpdateStudentPage);
router.post("/:id/update/",StudentController.updateStudent);
router.get("/:id/delete/",StudentController.deleteStudent);