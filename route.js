import express from 'express';
import { createOrUpdateStudent, readAllStudents, readStudent, deleteStudent } from './database/index.js';
import { render } from 'pug';


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
      res.status(500).json({ success: false, message: "Error fetching students" });
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
    return res.render('students', { students: [data], type: 'single' });;
  }
  res.status(data['status']).json({ success: false, message: data['message'] });
});

router.get('/upsert', async (req, res) => {
  res.render('upsert')
});

router.get('/getStudent', async (req, res) => {
  res.render('get_student')
});

/* 
* Create or Update a student
*/
router.post('/student', async (req, res) => {
  const { success, data } = await createOrUpdateStudent(req.body);
  if (success) {
    // return res.json({ success, data });
    req.flash('success', 'Created student successfully.')
    res.render('index', {success: req.flash('success')});
  } else {
    req.flash('failure', 'Failed to create student. Please try again.')
    res.render('index', {failure: req.flash('failure')})
    // res.status(404).json({ success: false, message: 'CreateOrUpdate failed' });    
  }
});

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
    // res.status(404).json({ success: false, message: "Student not found" });
    req.flash('failure', 'Failed to remove student. Please try again.');
    res.render('index', {failure: req.flash('failure')});
  }
});


router.get('/remove', async (req, res) => {
  res.render('remove')
});

// Use the error handling middleware
router.use(errorHandler);

export default router;
