import {Schema, model} from "mongoose";
interface iClassroom {
    name : string;
}
const classroomSchema = new Schema <iClassroom> ({
    name: String,
})
export const classroomModel = model("classroom",classroomSchema);