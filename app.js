require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");

const app = express();


// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes 
//changed app.use("/", studentRoutes); to app.use("/students", studentRoutes); concerning the task 4.2
app.use("/students", studentRoutes);


// error handling middleware for task 4.3
// 404 middleware
app.use((req, res, next) => {
    const error = new Error("Page not found.");
    error.status = 404;
    next(error);
});

// Central error handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).render("error", {
        message: err.message || "Something went wrong."
    });
});

// Database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });