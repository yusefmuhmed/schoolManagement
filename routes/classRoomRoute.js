const express = require("express");
const authService = require("../services/authService");

const router = express.Router();
const {
  createclassRoomValidator,
  deleteclassRoomValidator,
  getSearchValidator,
} = require("../utils/validators/classRoomValidator");

const {
  UpdateclassRoom,
  getclassRoom,
  deleteclassRoom,
  getSearch,
  createclassRoom,
  searchClassroomByName,
  } = require("../services/classRoomService");

router.use(authService.protect);

// Admin
router.use(authService.allowedTo("schoolAdmin"));
router
  .route("/")
  .get(getclassRoom)
  .post(createclassRoomValidator, createclassRoom);
router.route("/delete/:id").delete(deleteclassRoomValidator, deleteclassRoom);
router.route("/Search/:id").get(getSearchValidator, getSearch);
router.route("/update/:id").put(UpdateclassRoom);
router.get("/:name", searchClassroomByName);


module.exports = router;
