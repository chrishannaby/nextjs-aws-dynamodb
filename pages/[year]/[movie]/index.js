import db from '../../../db.json';
import dynamoDb from '../../../lib/dynamo-db';
import Image from 'next/image';
import Header from '../../../components/Header.js';

async function getMovie({ year, movie }) {
  const numericYear = parseInt(year, 10);
  const params = {
    TableName: db.TableName,
    Key: {
      year: numericYear,
      title: movie
    }
  };
  try {
    const { Item } = await dynamoDb.get(params);
    return Item;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params: { year, movie } }) {
  const movieData = await getMovie({ year, movie });
  return {
    props: {
      movie: movieData
    }
  };
}

export default function Movie({ movie }) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:py-24 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="relative h-96 w-64 rounded-lg overflow-hidden bg-gray-100 mb-12">
        <Image
          src={movie.info.image_url}
          alt={`Poster for ${movie.title}`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="w-full h-full "
        />
      </div>
      <Header title={movie.title}>{movie.info.plot}</Header>
    </div>
  );
}
