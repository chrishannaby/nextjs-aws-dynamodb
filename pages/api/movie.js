import dynamoDb from '../../lib/dynamo-db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const item = JSON.parse(req.body);

    await dynamoDb.put({
      Item: item
    });

    res
      .status(201)
      .json({ pathname: `/${item.year}/${encodeURIComponent(item.title)}` });
  }
}
