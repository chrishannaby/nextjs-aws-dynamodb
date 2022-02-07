import BreadCrumbs from '../components/BreadCrumbs';
import '../styles/globals.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <BreadCrumbs />
      <Component {...pageProps} />;
    </>
  );
}
