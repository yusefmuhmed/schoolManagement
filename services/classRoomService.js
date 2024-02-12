const Classroom = require("../models/classRoomModel");

const School = require("../models/SchoolModel");


const factory = require("./handlersFactory");

//exports.createclassRoom = factory.createOne(Classroom);

exports.deleteclassRoom = factory.deleteOne(Classroom);

exports.getSearch = factory.getOne(Classroom);

exports.getclassRoom = factory.getAll(Classroom);

exports.UpdateclassRoom = factory.updateOne(Classroom);

exports.createclassRoom = async (req, res) => {
  try {
    // Assuming you have the schoolId in the request body
    const { schoolId } = req.body;

    // Check if the school with the provided schoolId exists
    const school = await School.findById(schoolId);
    if (!school) {
      return res
        .status(404)
        .json({ status: "error", message: "School not found" });
    }

    // Create the classroom
    const classroom = await Classroom.create({
      schoolId: school._id,
      ...req.body, // Include other classroom properties from the request body
    });

    // Update the classrooms array in the associated school document
    school.classrooms.push(classroom._id);
    await school.save();

    return res.status(201).json({ status: "success", data: classroom });
  } catch (error) {
    console.error("Error creating Classroom:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

exports.searchClassroomByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Use a case-insensitive regex for the search
    const regex = new RegExp(name, "i");

    // Search for Classroom with names matching the provided term
    const Classrooms = await Classroom.find({ name: regex });

    // Check if Classrooms were found
    if (Classrooms.length === 0) {
      return res
        .status(404)
        .json({
          status: "fail",
          message: "No Classrooms found for the given search term",
        });
    }

    // Return the number of Classrooms found along with the list of Classrooms
    return res
      .status(200)
      .json({ status: "success", count: Classrooms.length, Classrooms });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }
};

