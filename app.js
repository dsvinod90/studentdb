import express from 'express';
import bodyParser from 'body-parser';
import student from './route.js';
import createStudentDBTable from './database/entityCreator.js';
import {dynamodb} from './config.js';
import flash from 'connect-flash';
import session from 'express-session';

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(session({
    secret: 'student',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.set('view engine', 'pug');

app.get("/", (req, res)=>{
    res.render('index')
})

// All endpoints pre-fixed with /api
app.use('/api', student)

// Run nodeJS on port 8080
const PORT = 8080

app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
    // Create student table when node starts for the first time
    createStudentDBTable(dynamodb);
})
