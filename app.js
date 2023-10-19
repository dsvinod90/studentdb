import express from 'express';
import bodyParser from 'body-parser';
import student from './route.js';

<<<<<<< Updated upstream
const app = express()

app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.json({"Hi":"Hello World"})
})

app.use('/api', student)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})
=======
const { createStudentDBTable } = require('./database/entityCreator.js'); // Import the function

const app = express();
AWS.config.update({
  region: "localhost",
  endpoint: "http://localhost:8000"
});

const DynamoDB = new AWS.DynamoDB();
const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  createStudentDBTable(DynamoDB);
});





>>>>>>> Stashed changes
