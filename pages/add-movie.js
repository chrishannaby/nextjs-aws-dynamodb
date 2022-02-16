import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function AddMovie() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const params = {
      title: form.title.value,
      year: parseInt(form.year.value.split('-')[0], 10),
      info: {
        image_url: form.image.value,
        plot: form.plot.value
      }
    };
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    const data = await res.json();
    router.push(data.pathname);
  };
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:py-24 sm:px-6 lg:px-8">
      <Header title="Add movie">
        Add your favourite movie to our database!
      </Header>
      <form onSubmit={handleSubmit} className="mt-12 grid grid-cols-1 gap-y-6">
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="year" className="sr-only">
            Email
          </label>
          <input
            id="year"
            name="year"
            type="month"
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            placeholder="Release Year"
          />
        </div>
        <div>
          <label htmlFor="image" className="sr-only">
            Phone
          </label>
          <input
            type="url"
            name="image"
            id="image"
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            placeholder="Poster Image URL"
          />
        </div>
        <div>
          <label htmlFor="plot" className="sr-only">
            Plot
          </label>
          <textarea
            id="plot"
            name="plot"
            rows={4}
            className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            placeholder="Plot summary"
            defaultValue={''}
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add movie
          </button>
        </div>
      </form>
    </div>
  );
}
