const express = require("express");
const authService = require("../services/authService");

const router = express.Router();
const {
  createStudentValidator,
  deleteStudentValidator,
  getSearchValidator,
} = require("../utils/validators/StudentValidator");

const {
  UpdateStudent,
  getStudent,
  deleteStudent,
  getSearch,
  createStudent,
} = require("../services/StudentService");

router.use(authService.protect);

// Admin
router.use(authService.allowedTo("schoolAdmin"));
router.route("/").get(getStudent).post(createStudentValidator, createStudent);
router.route("/delete/:id").delete(deleteStudentValidator, deleteStudent);
router.route("/Search/:id").get(getSearchValidator, getSearch);
router.route("/update/:id").put(UpdateStudent);



module.exports = router;
