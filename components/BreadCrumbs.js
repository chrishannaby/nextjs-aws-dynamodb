import { HomeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true }
];

export default function BreadCrumbs() {
  const router = useRouter();
  const { year, movie } = router.query;
  const pages = [];
  if (year) {
    pages.push({
      name: year,
      href: `/${year}`
    });
  }
  if (movie) {
    pages.push({
      name: movie,
      href: {
        pathname: '/[year]/[movie]',
        query: { year, movie }
      }
    });
  }
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <Link href="/">
            <a className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </Link>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link href={page.href}>
                <a className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {page.name}
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
