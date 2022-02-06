import db from '../db.json';
import dynamoDb from '../lib/dynamo-db';

export async function getServerSideProps() {
  const params = {
    TableName: db.TableName,
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: {
      '#yr': 'year'
    },
    ExpressionAttributeValues: {
      ':yyyy': 1985
    }
  };
  const { Items } = await dynamoDb.query(params);
  return {
    props: {
      movies: Items
    }
  };
}

export default function App({ movies }) {
  const movieRows = movies.map((movie) => (
    <p key={movie.title}>{movie.title}</p>
  ));
  return <main>{movieRows}</main>;
}
