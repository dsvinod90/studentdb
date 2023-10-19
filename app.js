import express from 'express';
import bodyParser from 'body-parser';
import student from './route.js';
import createStudentDBTable from './database/entityCreator.js';

const app = express()

app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.json({"Hi":"Hello World"})
})

app.use('/api', student)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
    createStudentDBTable(DynamoDB);
})
