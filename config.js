import AWS from 'aws-sdk'

AWS.config.update({
    region: "localhost",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: "http://localhost:8000"
})


console.log(process.env.AWS_ACCESS_KEY_ID)

const dynamodb = new AWS.DynamoDB
const db = new AWS.DynamoDB.DocumentClient()
const studentTable = 'students'

export {
  db,
  dynamodb,
  studentTable
}