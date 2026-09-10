const { sanitizeFilter } = require("mongoose");

/*const express = require("express");

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


module.exports = router;*/


//Task 4.2

const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");


router.get("/", studentController.getStudents);


router.get("/new", studentController.showNewStudentForm);


router.get("/:id/edit", studentController.showEditStudentForm);

// GET /students/:id
router.get("/:id", studentController.getStudent);

// POST /students
router.post("/", studentController.createStudent);


router.post("/:id/edit", studentController.updateStudent);

router.post("/:id/delete", studentController.deleteStudent);

module.exports = router;