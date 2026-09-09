const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");


// Show all students
router.get(
    "/students",
    studentController.getStudents
);


// Show new student form
router.get(
    "/students/new",
    studentController.showNewStudentForm
);


// Show one student
router.get(
    "/students/:id",
    studentController.getStudent
);


// Show edit form
router.get(
    "/students/:id/edit",
    studentController.showEditStudentForm
);


// Create student
router.post(
    "/students",
    studentController.createStudent
);


// Update student
router.post(
    "/students/:id/edit",
    studentController.updateStudent
);


// Delete student
router.post(
    "/students/:id/delete",
    studentController.deleteStudent
);


module.exports = router;