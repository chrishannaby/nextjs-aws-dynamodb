import db from '../../db.json';
import dynamoDb from '../../lib/dynamo-db';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header.js';

async function getMoviesFromYear(year) {
  const numericYear = parseInt(year, 10);
  const params = {
    TableName: db.TableName,
    KeyConditionExpression: '#yr = :yyyy',
    ExpressionAttributeNames: {
      '#yr': 'year'
    },
    ExpressionAttributeValues: {
      ':yyyy': numericYear
    }
  };
  try {
    const { Items } = await dynamoDb.query(params);
    return Items;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getServerSideProps({ params: { year } }) {
  const movies = await getMoviesFromYear(year);
  if (!movies) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      year,
      movies
    }
  };
}

export default function Year({ movies, year }) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:py-24 sm:px-6 lg:px-8">
      <Header title={year} />
      <div className="mt-24 flex flex-wrap gap-12 justify-center">
        {movies.map((movie) => (
          <Link
            href={{
              pathname: '/[year]/[movie]',
              query: {
                year: movie.year,
                movie: movie.title
              }
            }}
          >
            <a key={movie.title} className="group text-sm">
              <div className="relative h-96 w-64 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-75">
                <Image
                  src={movie.info.image_url}
                  alt={`Poster for ${movie.title}`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="w-full h-full"
                />
              </div>
              <h3 className="mt-4 font-medium text-gray-900">{movie.title}</h3>
              <p className="text-gray-500 italic">{}</p>
              <p className="mt-2 font-medium text-gray-900">{}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
