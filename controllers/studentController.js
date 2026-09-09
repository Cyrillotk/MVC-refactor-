const mongoose = require("mongoose");
const Student = require("../models/Student");

// GET /students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });

        res.render("students/index", {
            students
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).render("error", {
            message: "Unable to fetch students."
        });
    }
};


// GET /students/:id
exports.getStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).render("error", {
                message: "Invalid student ID."
            });
        }

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).render("error", {
                message: "Student not found."
            });
        }

        res.render("students/detail", {
            student
        });
    } catch (error) {
        console.error("Error fetching student:", error);

        res.status(500).render("error", {
            message: "Unable to fetch student."
        });
    }
};


// POST /students
exports.createStudent = async (req, res) => {
    try {
        const { name, age, course, email } = req.body;

        if (!name || !age || !course || !email) {
            return res.status(400).render("error", {
                message: "All fields are required."
            });
        }

        await Student.create({
            name,
            age,
            course,
            email
        });

        res.redirect("/students");
    } catch (error) {
        console.error("Error creating student:", error);

        res.status(500).render("error", {
            message: "Unable to create student."
        });
    }
};


// POST /students/:id/edit
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, course, email } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).render("error", {
                message: "Invalid student ID."
            });
        }

        if (!name || !age || !course || !email) {
            return res.status(400).render("error", {
                message: "All fields are required."
            });
        }

        const student = await Student.findByIdAndUpdate(
            id,
            {
                name,
                age,
                course,
                email
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).render("error", {
                message: "Student not found."
            });
        }

        res.redirect("/students");
    } catch (error) {
        console.error("Error updating student:", error);

        res.status(500).render("error", {
            message: "Unable to update student."
        });
    }
};


// POST /students/:id/delete
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).render("error", {
                message: "Invalid student ID."
            });
        }

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).render("error", {
                message: "Student not found."
            });
        }

        res.redirect("/students");
    } catch (error) {
        console.error("Error deleting student:", error);

        res.status(500).render("error", {
            message: "Unable to delete student."
        });
    }
};


// GET /students/new
exports.showNewStudentForm = (req, res) => {
    res.render("students/new");
};


// GET /students/:id/edit
exports.showEditStudentForm = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).render("error", {
                message: "Invalid student ID."
            });
        }

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).render("error", {
                message: "Student not found."
            });
        }

        res.render("students/edit", {
            student
        });
    } catch (error) {
        console.error("Error loading edit form:", error);

        res.status(500).render("error", {
            message: "Unable to load edit form."
        });
    }
};