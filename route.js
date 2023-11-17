import express from 'express';
import { createOrUpdateStudent, readAllStudents, readStudent, deleteStudent, updateStudent, enrollStudent } from './database/index.js';

const router = express.Router();
router.use(express.urlencoded({
    extended: true
  }));

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
};

// Validation middleware for checking the existence of required parameters
const validateParams = (req, res, next) => {
  console.log(req.query)
  const { name, number } = req.query;
  console.log(req.query)
  if (!name || !number) {
    return res.status(400).json({ success: false, message: "Invalid request parameters" });
  }
  next();
};

/* 
* Get all students
*/
router.get('/students', async (req, res) => {
  try {
    const { success, data } = await readAllStudents();
    if (success) {
      res.render('students', { students: data, type: 'all' });
    } else {
      req.flash('failure', 'No students found.')
      res.render('index', {failure: req.flash('failure')});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* 
* Get student by name and number
*/
router.get('/student', validateParams, async (req, res) => {
  const name = req.query.name;
  const number = req.query.number;
  const { success, data } = await readStudent(name, number);
  if (success) {
    res.render('students', { students: [data], type: 'single' });
  } else {
    req.flash('failure', 'Student record not found.')
    res.render('get_student', {failure: req.flash('failure')});
  }
});

/*
* Create/Update form for students
*/
router.get('/upsert', async (req, res) => {
  res.render('upsert')
});

/*
* Form to fetch a particular student by Name and phone number
*/
router.get('/getStudent', async (req, res) => {
  res.render('get_student')
});

/* 
* Create a student
*/
router.post('/student', async (req, res) => {
  const { success, data } = await createOrUpdateStudent(req.body);
  if (success) {
    req.flash('success', 'Created student successfully.')
    res.render('index', {success: req.flash('success')});
  } else {
    req.flash('failure', 'Failed to create student. Please try again.')
    res.render('index', {failure: req.flash('failure')})
  }
});

/* 
* Update a student
*/
router.post('/update-student', async (req, res) => {
  const { success, data } = await updateStudent(req.body);
  if (success) {
    req.flash('success', 'Updated student successfully.')
    res.render('index', {success: req.flash('success')});
  } else {
    req.flash('failure', 'Failed to update student. Please try again.')
    res.render('index', {failure: req.flash('failure')})
  }
})

/* 
* Delete a student
*/
router.get('/remove-student', validateParams, async (req, res) => {
  const name = req.query.name;
  const number = req.query.number;
  const { success, data } = await deleteStudent(name, number);
  if (success) {
    req.flash("success", "Removed Student Successfully!");
    res.render('index', {success: req.flash('success')});
  } else {
    req.flash('failure', 'Failed to remove student. Please try again.');
    res.render('index', {failure: req.flash('failure')});
  }
});

/*
* Remove form to delete a student from the database
*/
router.get('/remove', async (req, res) => {
  res.render('remove');
});

/*
* Enroll a student page
*/
router.get('/enroll-student', async (req, res) => {
  res.render('enroll-student');
})

/* 
*  Enroll student for courses
*/
router.post('/enroll', async (req, res) => {
  const { success, data } = await enrollStudent(req.body);
  if (success) {
    req.flash('success', 'Updated student successfully.')
    res.render('index', {success: req.flash('success')});
  } else {
    req.flash('failure', 'Failed to update student. Please try again.')
    res.render('index', {failure: req.flash('failure')})
  }
})

// Use the error handling middleware
router.use(errorHandler);

export default router;
