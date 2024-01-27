import MainLayout, { propsType } from '@/layout';
import { COUNTRY, IS_FIRST_TIME, LANGUAGE } from '@/constant';
import PropsProvider from '@/contexts/PropsContext';
import { store } from '@/store';
import '@/styles/globals.css';
import {
  ItemExistInLocalStorage,
  SetItemInLocalStorage,
} from '@/utils/function';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  const componentLayout = (Component as any).layout as propsType;

  useEffect(() => {
    if (!ItemExistInLocalStorage(IS_FIRST_TIME)) {
      SetItemInLocalStorage(IS_FIRST_TIME, true);
    }
    if (!ItemExistInLocalStorage(COUNTRY)) {
      SetItemInLocalStorage(COUNTRY, 'us');
    }
    if (!ItemExistInLocalStorage(LANGUAGE)) {
      SetItemInLocalStorage(LANGUAGE, 'en');
    }
  }, []);

  return (
    <Provider store={store}>
      <PropsProvider>
        <Head>
          <title>Global News Feed App</title>
        </Head>
        <MainLayout {...componentLayout}>
          <Component {...pageProps} />
        </MainLayout>
      </PropsProvider>
    </Provider>
  );
}
