const mongoose = require('mongoose');

const {Schema} = mongoose;

const StudentSchema = new Schema({

  classroomId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Classroom', 
    required: true },
    studentName: { 
    type: String, 
    required: true },
  age: { 
    type: Number, 
    required: true },
  grade: { 
    type: String,
     required: true },
});
const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
