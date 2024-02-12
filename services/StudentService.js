const Student = require("../models/StudentModel");
const Classroom = require("../models/classRoomModel");

const factory = require("./handlersFactory");

exports.createStudent = factory.createOne(Student);

exports.deleteStudent = factory.deleteOne(Student);

exports.getSearch = factory.getOne(Student);

exports.getStudent = factory.getAll(Student);

exports.UpdateStudent = factory.updateOne(Student);


exports.createStudent = async (req, res) => {
    try {
        // Assuming you have the classroomId in the request body
        const { classroomId } = req.body;

        // Check if the classroom with the provided classroomId exists
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(404).json({ status: "error", message: "classroom not found" });
        }

        // Create the students
        const student = await Student.create({
            classroomId: classroom._id,
            ...req.body, // Include other Student properties from the request body
        });

        // Update the Student array in the associated classroom document
        classroom.students.push(student._id);
        await classroom.save();

        return res.status(201).json({ status: "success", data: student });
    } catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};


  