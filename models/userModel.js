/* eslint-disable global-require */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const {Schema} = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    subjects: {
      type: String,
      trim: true,
      required: false,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [4, "Too short password"],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ["Teacher", "schoolAdmin", "superAdmin"],
      required: [true, "role required"],
    },
    gender: {
      type: String,
      enum: ["female", "male"],
    },
    birthday: {
      type: Date,
    },
 
    schools: [{ type: Schema.Types.ObjectId, 
      ref: 'School',
      required: false,
     }],

  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

  // models/UserModel.js
userSchema.post("save", async (doc, next) => {
  if (doc.role === "superAdmin" && !doc.schools.length) {
      try {
          const School = require("./SchoolModel");
          const school = await School.create({
              schoolName: "School name",
              superAdminId: doc._id,
              // Add other default values
          });

          // Update the superAdmin's schools array
          doc.schools.push(school._id);
          await doc.save();
      } catch (err) {
          console.error("Error creating School:", err);
      }
  }
  next();
});


const User = mongoose.model("User", userSchema);

module.exports = User;
