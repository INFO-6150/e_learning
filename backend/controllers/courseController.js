const Course = require('../models/Course');
const upload = require('../routes/multerConfig');

exports.createCourse = async (req, res) => {
  upload.single('courseImage')(req, res, async (error) => {
    if (error) {
      return res.status(500).json({ message: 'Error uploading file', error });
    }

    try {
      const { title, description, duration, syllabus, professor } = req.body;
      let courseImage = '';

      if (req.file && req.file.location) {
        // If there's a file uploaded and it has a location, use that as the image URL
        courseImage = req.file.location;
      }

      const newCourse = new Course({
        title,
        description,
        duration,
        syllabus,
        professor, // This would be the ID of the professor creating the course
        courseImage // Include the image URL in the course document
      });

      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: 'Error creating course', error });
    }
  });
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: 'Error updating course', error });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting course', error });
  }
};

// controllers/courseController.js

exports.uploadVideo = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).send('Course not found');
      }
      
      // Assuming videoUrl comes from your S3 upload logic and title from the request body
      const videoData = {};
      if (req.body.title) videoData.title = req.body.title;
      if (req.file && req.file.location) videoData.url = req.file.location;
      
      if (Object.keys(videoData).length > 0) {
        course.videos.push(videoData);
        await course.save();
      }
  
      res.status(200).json({ message: 'Video uploaded successfully', course });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Function to register a student for a course
exports.registerStudentForCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.body; // Assuming you have user authentication and store user ID in req.user
    console.log(courseId)
    console.log(studentId)
    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).send('Course not found');
    }

    // Check if the student is already registered for the course
    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student is already registered for this course' });
    }

    // Add the student to the course's list of registered students
    course.students.push(studentId);
    await course.save();

    res.status(200).json({ message: 'Student registered for the course successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student for the course', error });
  }
};

// Function to allow a student to drop a course
exports.dropCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the student is registered for the course
    if (!course.students.includes(studentId)) {
      return res.status(400).json({ message: 'Student is not registered for this course' });
    }

    // Remove the student from the course's list of registered students
    course.students = course.students.filter((student) => student.toString() !== studentId.toString());
    await course.save();

    res.status(200).json({ message: 'Student dropped the course successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error dropping the course', error });
  }
};


// Function to view all courses with optional filters
const mongoose = require('mongoose');

exports.viewAllCourses = async (req, res) => {
  try {
    let filter = {};

    // Check if a professor filter is provided
    if (req.query.professor) {
      filter.professor = mongoose.Types.ObjectId(req.query.professor);
    }

    // Check if a student filter is provided
    if (req.query.student) {
      const studentId = mongoose.Types.ObjectId(req.query.student);
      filter.students = studentId;
    }

    // Diagnostic logging to check the filter
    console.log("Filter applied:", filter);

    // Retrieve courses based on filters
    const courses = await Course.find(filter).populate('professor students');
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};
