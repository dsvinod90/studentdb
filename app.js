const AWS = require("aws-sdk");
const express = require('express');

const app = express();
AWS.config.update({
  region: "localhost"
});

const DynamoDB = new AWS.DynamoDB();
const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
