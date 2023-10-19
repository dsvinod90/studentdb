


function createStudentDBTable(dynamodb) {
  const params = {
    TableName: 'students',
    KeySchema: [
      { AttributeName: 'Name', KeyType: 'HASH' },  // Partition key
      { AttributeName: 'PrimaryPhone', KeyType: 'RANGE' }  // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'Name', AttributeType: 'S' },
      { AttributeName: 'PrimaryPhone', AttributeType: 'S' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };


  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error('Unable to create table. Error:', JSON.stringify(err, null, 2));
    } else {
      console.log('Created table:', JSON.stringify(data, null, 2));
    }
  });
}
module.exports = {
  createStudentDBTable
};

