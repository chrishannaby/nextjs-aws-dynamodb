import aws from 'aws-sdk';

const params = {
  region: process.env.REGION,
  params: {
    TableName: process.env.TABLE_NAME
  }
};

if (process.env.NODE_ENV === 'development') {
  params.accessKeyId = process.env.BUILD_ACCESS_KEY_ID;
  params.secretAccessKey = process.env.BUILD_SECRET_ACCESS_KEY;
}

const client = new aws.DynamoDB.DocumentClient(params);

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise()
};
