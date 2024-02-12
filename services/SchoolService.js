const factory = require("./handlersFactory");

const School = require("../models/SchoolModel");

const User = require("../models/userModel");


exports.deleteSchool = factory.deleteOne(School);
 
exports.getSearch = factory.getOne(School);

exports.getSchool = factory.getAll(School);

exports.UpdateSchool = factory.updateOne(School);

exports.createSchool = async (req, res) => {
    try {
        // Assuming you have the userId in the request body
        const { userId } = req.body;

        // Check if the user with the provided userId is a superAdmin
        const user = await User.findById(userId);
        if (!user || user.role !== "superAdmin") {
            return res.status(403).json({ status: "error", message: "Permission denied" });
        }

        // Create the school
        const createdSchool = await School.create({
            ...req.body, // Include other school properties from the request body
        });

        // Update the schools array in the associated user document
        user.schools.push(createdSchool._id);
        await user.save();

        return res.status(201).json({ status: "success", data: createdSchool });
    } catch (error) {
        console.error("Error creating School:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};
exports.searchschoolByName = async (req, res) => {
    try {
      const {schoolName} = req.params;
  
      // Use a case-insensitive regex for the search
      const regex = new RegExp(schoolName, 'i');
  
      // Search for schools with names matching the provided term
      const schools = await School.find({ schoolName: regex });
  
      // Check if schools were found
      if (schools.length === 0) {
        return res.status(404).json({ status: 'fail', message: 'No schools found for the given search term' });
      }
  
      // Return the number of schools found along with the list of schools
      return res.status(200).json({ status: 'success', count: schools.length, schools });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', error: "Internal Server Error" });
    }
  };
  exports.addMediaArray = async (schoolId, mediaArray) => {
    try {
      const school = await School.findByIdAndUpdate(
        schoolId,
        { $push: { media: { $each: mediaArray } } },
        { new: true }
      );
  
      return school;
    } catch (error) {
      console.error('Error adding media array to School:', error);
      throw error;
    }
  };