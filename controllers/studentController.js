import Student from "../models/student.js";

export function getstudents(req,res){
    studentRouter.find()
    .then((students)=>{
        res.json(students);
    })
    .catch(()=>{
        res.json({
            message:"faild to fetch students"
        })
    })

}
export function createStudent(req,res){
    if(req.user==null){
        res.status(403).json({
            message:"Please login to create a student"
        })
        return
    }
    if(req.user.role!="admin"){
        res.status(403).json({
            message:"Please login as an admin to create user"
        })
        return

    }
    console.log(req.body)
    const student=new Student({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
    })
    student.save()
    .then(()=>{
        res.json({
            message:"student saved successfully"
        })
    })
    .catch(()=>{
        console.log("Faild to save student")
    })
}