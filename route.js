import express from  'express';
import {createOrUpdateStudent, readAllStudents, readStudent, deleteStudent } from './database/index.js';

const router = express.Router();

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
};

// Validation middleware for checking the existence of required parameters
const validateParams = (req, res, next) => {
  const { name, number } = req.query;
  if (!name || !number) {
    return res.status(400).json({ success: false, message: "Invalid request parameters" });
  }
  next();
};

/* 
* Get all students
*/
router.get('/students', async (req, res) => {
  const { success, data} = await readAllStudents();
  const size = data['size']
  if (success) {
    return res.json({ success, data, size});
  }
  res.status(500).json({ success: false, message: "Error" });
});

/* 
* Get student by name and number
*/
router.get('/student', validateParams, async (req, res) => {
  const name = req.query.name;
  const number = req.query.number;
  const { success, data } = await readStudent(name, number);
  if (success) {
    return res.json({ success, data });
  }
  res.status(data['status']).json({ success: false, message: data['message'] });
});

/* 
* Create  a student 
*/
router.post('/student', async (req, res) => {
  const { success, data } = await createStudent(req.body);
  if (success) {
    return res.status(201).json({ success, data });
  }
  const {message, status} = data
  res.status(status).json({ success: false, message});
});

/* 
* Update a student
*/
router.put('/student', async (req, res) => {
  const { success, data } = await createOrUpdateStudent(req.body);
  if (success) {
    return res.json({ success, data });
  }
  res.status(404).json({ success: false, message: 'CreateOrUpdate failed' });
});

/* 
* Delete a student
*/
router.delete('/student', validateParams, async (req, res) => {
  const name = req.query.name;
  const number = req.query.number;
  const { success, data } = await deleteStudent(name, number);
  if (success) {
    return res.json({ success, data });
  }
  res.status(404).json({ success: false, message: "Student not found" });
});

// Use the error handling middleware
router.use(errorHandler);

export default router;
