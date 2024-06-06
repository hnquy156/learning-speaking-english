import 'regenerator-runtime/runtime';
import '@/styles/globals.css';
import Header from '@/components/Header';

export default function App({ Component, pageProps }) {
  return (
    <div className="h-screen">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
