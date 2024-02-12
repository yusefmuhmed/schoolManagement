const mongoose = require("mongoose");

const {Schema} = mongoose;

const classRoomSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    students: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Student' }],

  },
  { timestamps: true }
);

const classRoomModel = mongoose.model("Classroom ", classRoomSchema);

module.exports = classRoomModel;
