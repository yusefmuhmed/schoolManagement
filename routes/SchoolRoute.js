const express = require("express");

const {
  createSchoolValidator,
  deleteSchoolValidator,
  getSearchValidator,
} = require("../utils/validators/SchoolValidator");

const {
  UpdateSchool,
  getSchool,
  deleteSchool,
  getSearch,
  createSchool,
  searchschoolByName,
  addMediaArray,
} = require("../services/SchoolService");

const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect);

// Admin
router.use(authService.allowedTo("superAdmin"));
router.route("/").get(getSchool).post(createSchoolValidator, createSchool);
router.route("/delete/:id").delete(deleteSchoolValidator, deleteSchool);
router.route("/Search/:id").get(getSearchValidator, getSearch);
router.route("/update/:id").put(UpdateSchool);

router.get("/:schoolName", searchschoolByName);
router.route("/addMedia/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const { media } = req.body;

    // Check if 'media' is present and is an array
    if (!media || !Array.isArray(media) || media.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or empty media array" });
    }

    const updatedSchool = await addMediaArray(id, media);

    if (updatedSchool) {
      return res.status(200).json({ success: true, data: updatedSchool });
    } 
      return res
        .status(404)
        .json({ success: false, message: "Image can't be uploaded" });
    
  } catch (error) {
    console.error("Error adding media array to School:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
