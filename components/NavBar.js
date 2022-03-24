import BreadCrumbs from './BreadCrumbs';
import { PlusSmIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  const addMoviePathname = '/add-movie';
  const onAddMovie = addMoviePathname === router.asPath;
  return (
    <div className="px-8 pt-8 flex items-center justify-between">
      <BreadCrumbs />
      {!onAddMovie && (
        <Link href="/add-movie">
          <a className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PlusSmIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Add movie
          </a>
        </Link>
      )}
    </div>
  );
}
