import NavBar from '../components/NavBar.js';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
