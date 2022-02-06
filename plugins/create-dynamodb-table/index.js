var AWS = require('aws-sdk');
module.exports = {
  onPreBuild: async ({ utils: { build } }) => {
    const params = {
      region: process.env.REGION,
      accessKeyId: process.env.BUILD_AWS_ACCESS_KEY,
      secretAccessKey: process.env.BUILD_AWS_SECRET_KEY
    };
    console.log(AWS);
    const tableName = process.env.TABLE_NAME;

    var dynamodb = new AWS.DynamoDB(params);

    dynamodb.listTables({ Limit: 10 }, function (err, data) {
      if (err) {
        console.log('Error', err.code);
      } else {
        console.log('Table names are ', data.TableNames);
      }
    });

    console.log(`Checking if ${tableName} exists`);
    let tableExists = false;
    let data = null;
    let err = null;
    await dynamodb.describeTable({ TableName: tableName }, function (
      err,
      data
    ) {
      if (err) {
        err = err;
      } else {
        tableExists = true;
        data = data;
      }
    });
    console.log(err);
    if (tableExists) {
      console.log(`${tableName} exists`);
      return true;
    }
    console.log(`${tableName} does not exist`);

    const dBparams = {
      TableName: tableName,
      KeySchema: [
        { AttributeName: 'year', KeyType: 'HASH' }, //Partition key
        { AttributeName: 'title', KeyType: 'RANGE' } //Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: 'year', AttributeType: 'N' },
        { AttributeName: 'title', AttributeType: 'S' }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    };

    console.log(`Creating ${tableName}`);
    let createTableErr = null;
    dynamodb.createTable(dBparams, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('created');
      }
    });
    if (createTableErr) {
      console.log(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      build.failBuild('Could not create dynamodb table');
    }
  }
};
