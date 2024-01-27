import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Global News Feed App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
