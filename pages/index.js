import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
export default function App() {
  const { data, error } = useSWR(
    '/api/item?artist=Acme%20Band&song=Happy%20Day',
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  return (
    <main>
      <p>This is a deploy preview!</p>
      <code>{JSON.stringify(data, null, 2)}</code>
    </main>
  );
}
