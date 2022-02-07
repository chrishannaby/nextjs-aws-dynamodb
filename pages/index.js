import db from '../db.json';
import dynamoDb from '../lib/dynamo-db';
import Link from 'next/link';
import Header from '../components/Header.js';

async function getMovieYears() {
  var params = {
    TableName: db.TableName,
    ProjectionExpression: '#yr',
    ExpressionAttributeNames: {
      '#yr': 'year'
    }
  };
  const { Items } = await dynamoDb.scan(params);
  return [...new Set(Items.map((y) => y.year))].sort((a, b) => b - a);
}

export async function getServerSideProps() {
  const years = await getMovieYears();
  return {
    props: {
      years
    }
  };
}

export default function App({ years }) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:py-24 sm:px-6 lg:px-8">
      <Header title="Netlify Movie Database">
        Find films by release date by selecting a year below
      </Header>
      <ul className="mt-12 flex gap-4 flex-wrap items-center justify-center">
        {years.map((year) => {
          return (
            <Link href={`/${year}`}>
              <a className="inline-flex items-center py-3 w-24 justify-center border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {year}
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
