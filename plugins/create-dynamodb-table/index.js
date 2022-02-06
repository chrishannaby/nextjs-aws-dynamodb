module.exports = {
  async onPreBuild({ utils: { build } }) {
    const { v4: uuidv4 } = require('uuid');
    const deployId = process.env.DEPLOY_ID || uuidv4();
    const AWS = require('aws-sdk');
    const fs = require('fs');
    const tableName = `NetlifyFunctionsDeployPreview_${deployId}_Movies`;

    AWS.config.update({
      region: process.env.REGION,
      accessKeyId: process.env.BUILD_ACCESS_KEY_ID,
      secretAccessKey: process.env.BUILD_SECRET_ACCESS_KEY
    });

    const dynamodb = new AWS.DynamoDB();

    const params = {
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
    try {
      const table = await dynamodb.createTable(params).promise();
    } catch (err) {
      if (err.code === 'ResourceInUseException') {
        console.log('Table already exists');
        return;
      }
      console.error(err);
      build.failBuild('Could not create dynamodb table');
    }

    let status = 'CREATING';
    while (status === 'CREATING') {
      await new Promise((r) => setTimeout(r, 1000));
      console.log(`Checking table status`);
      try {
        const { Table } = await dynamodb
          .describeTable({ TableName: tableName })
          .promise();
        status = Table.TableStatus;
      } catch (err) {
        console.error(err);
      }
    }

    const client = new AWS.DynamoDB.DocumentClient();
    const seedData = JSON.parse(
      fs.readFileSync('./plugins/create-dynamodb-table/moviedata.json', 'utf-8')
    );
    const operations = seedData.map((movie) => {
      var data = {
        TableName: tableName,
        Item: {
          year: movie.year,
          title: movie.title,
          info: movie.info
        }
      };
      return client.put(data).promise();
    });
    Promise.all(operations);
    console.log(`Added ${seedData.length} items to table`);
  }
};
