import {Schema, model} from "mongoose";
interface iStudent {
    name : string;
    theoreticalPoint: number;
    practicePoint: number;
    description: string;
    assess: string;
    classroom: Object;
}
const studentSchema = new Schema <iStudent> ({
    name: String,
    theoreticalPoint: Number,
    practicePoint: Number,
    description: String,
    assess: String,
    classroom: {type: Schema.Types.ObjectId, ref:'classroom'},
})
export const studentModel = model("student",studentSchema);