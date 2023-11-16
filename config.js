import AWS from 'aws-sdk'

// Setup AWS configuration
AWS.config.update({
    region: "localhost",
    // Use access key from environment variable in host
    accessKeyId: 'AKIA5LZYYVXGWIQH6TVC',
    // Use secret access key from environment variable in host
    secretAccessKey: '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',
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