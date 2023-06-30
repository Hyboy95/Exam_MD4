import {studentModel} from "../models/schemas/student.model";
import {classroomModel} from "../models/schemas/classroom.model"

export class StudentController {

    static async getCreateNewStudentPage(req: any, res: any) {
        let classrooms = await classroomModel.find()
        res.render("create",{classrooms});
    }

    static async createNewStudent (req:any, res:any){
        try{
        let newStudent = new studentModel(req.body)
            if(newStudent){
                await newStudent.save();
                res.redirect("/student/list")
            } else res.render("notfound")
        } catch (error){
            res.render("notfound")
        }
    }

    static async getListStudentsPage (req:any, res:any){
        try{
            let query = {};
            if(req.body.classroom){
                query = {classroom: req.body.classroom}
            }
            let classrooms = await classroomModel.find();
            let students = await studentModel.find(query).populate({
                path: "classroom",
                select: "name",
            }).sort({theoreticalPoint:1});
            res.render('list',{students, classrooms})
        } catch (error){
            res.render("notfound")
        }
    }

    static async getDeailStudent(req:any, res:any) {
        try{
            let student = await studentModel.findOne ({_id: req.params.id}).populate({
                path:"classroom",
                select: "name",
            })
            if(student){
                res.render("detail",{student})
            } else res.render("notfound")
        } catch (error){
            res.render("notfound")
        }
    }

    static async getUpdateStudentPage(req:any, res:any){
        try{
            let classrooms = await classroomModel.find();
            let student = await studentModel.findOne ({_id: req.params.id}).populate({
                path:"classroom",
                select: "name",
            })
            if(student){
                res.render("update",{student, classrooms})
            } else res.render("notfound")
        } catch (error){
            res.render("notfound")
        }
    }
    static async updateStudent (req:any, res:any){
        try{
            let {name, classroom, theoreticalPoint, practicePoint, description, assess} = req.body;
            let studentNeedToUpdate = await studentModel.findOne ({_id: req.params.id});
            studentNeedToUpdate.name = name;
            studentNeedToUpdate.classroom = classroom;
            studentNeedToUpdate.theoreticalPoint = theoreticalPoint;
            studentNeedToUpdate.practicePoint = practicePoint;
            studentNeedToUpdate.description = description;
            studentNeedToUpdate.assess = assess;
            studentNeedToUpdate.save();
            res.redirect("/student/list")
        } catch (error){
            res.render("notfound")
        }
    }
    static async deleteStudent (req:any, res:any){
        await studentModel.deleteOne({_id:req.params.id})
        res.redirect("/student/list")
    }


}