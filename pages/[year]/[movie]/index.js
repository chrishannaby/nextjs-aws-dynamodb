import db from '../../../db.json';
import dynamoDb from '../../../lib/dynamo-db';
import Image from 'next/image';
import Header from '../../../components/Header.js';

export async function getServerSideProps({ params: { year, movie } }) {
  return {
    props: {
      year,
      movie
    }
  };
}

export default function Year({ movie }) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:py-24 sm:px-6 lg:px-8">
      <Header title={movie} />
    </div>
  );
}
