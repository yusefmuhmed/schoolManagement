/* eslint-disable no-undef */
const mongoose = require("mongoose");

const {Schema} = mongoose;

const SchoolSchema = new mongoose.Schema(
  {
    userId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"], // Specify the GeoJSON type
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0], // Default coordinates [longitude, latitude]
      },
    },

    schoolName: {
      type: String,
      trim: true,
      required: [true, "Business name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
     
    media: {
      type: [String],
      required: false,
    },
    classrooms: [{
       type: Schema.Types.ObjectId, 
       ref: 'Classroom' }],

  },
  { timestamps: true }
);



const SchoolModel = mongoose.model("School", SchoolSchema);

module.exports = SchoolModel;
