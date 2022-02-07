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
    <li className="w-64 py-12" key={movie.title}>
      {movie.title}
    </li>
  ));
  return (
    <ul className="max-w-screen grid grid-flow-col auto-cols-auto auto-rows-auto	 p-12">
      {movieRows}
    </ul>
  );
}
