require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Course = require("./models/Course");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mongooseCourseDemo",
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// Use Mongoose methods inside Express routes (CRUD)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the WEB172 Week 10 Mongoose Course API",
  });
});

app.get("/courses", (req, res) => {
  res.status(200).json({
    message: "Use /api/courses for course resources",
  });
});

app.get("/api/courses", async (req, res) => {
  try {
    // Read all: Course.find()
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Unable to load courses" });
  }
});

app.get("/api/courses/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    // Read one: Course.findById()
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Unable to load courses" });
  }
});

app.post("/api/courses", async (req, res) => {
  try {
    // Create: Course.create()
    const course = await Course.create({
      title: req.body.title,
      department: req.body.department,
      units: req.body.units,
      delivery: req.body.delivery,
      description: req.body.description,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create course",
      error: error.message,
    });
  }
});

app.put("/api/courses/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    // Update: Course.findByIdAndUpdate()
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        department: req.body.department,
        units: req.body.units,
        delivery: req.body.delivery,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({
      message: "Unable to update course",
      error: error.message,
    });
  }
});

app.delete("/api/courses/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    // Delete: Course.findByIdAndDelete()
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete course",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
