import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails, updateCourseDetails, uploadVideo } from '../utils/api'; // Ensure these functions exist and are imported correctly
import coursePlaceholder from '../assets/img-placeholder-course.png';
import Layout from '../header/Layout';
import './ManageCourse.css'; // Ensure you have this CSS file in your project
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

const ViewCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      const courseData = await fetchCourseDetails(courseId);
      setCourse(courseData);
    };
    getCourseDetails();
  }, [courseId]);


  
  if (!course) return <div>Loading...</div>;

  return (
    <Layout>
        <div className='course-content-wrap'>
      <ToastContainer />
      <div className="container py-4">
        
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card mb-4">
                <img 
                  src={course.courseImage || coursePlaceholder} 
                  className="course-image"
                  alt={course.title}
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} // Inline styles for image size
                />
                <div className="card-body">
                  <h1 className="card-title">{course.title}</h1>
                  <p className="card-text"><strong>Duration:</strong> {course.duration} weeks</p>
                  <p className="card-text">{course.description}</p>
                  <h2>Syllabus</h2>
                  <p>{course.syllabus}</p>
                </div>
              </div>
            </div>
          </div>
            <>
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h3 className="mb-3">Course Videos</h3>
                  <div className="row g-4">
                    {course.videos.map((video, index) => (
                      <div key={index} className="col-md-6 col-lg-4">
                        <div className="card h-100">
                          <div className="embed-responsive embed-responsive-16by9">
                            <video className="embed-responsive-item" controls>
                              <source src={video.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{video.title}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
        </div>
        </div>
      </Layout>
  );
};

export default ViewCourse;