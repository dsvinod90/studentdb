import AWS from 'aws-sdk'

// Setup AWS configuration
AWS.config.update({
    region: "localhost",
    // Use access key from environment variable in host
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // Use secret access key from environment variable in host
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // Dynamo DB running in port 8000
    endpoint: "http://localhost:8000"
})

const dynamodb = new AWS.DynamoDB
const db = new AWS.DynamoDB.DocumentClient()
const studentTable = 'students'

export {
  db,
  dynamodb,
  studentTable
}