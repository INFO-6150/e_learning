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
  
