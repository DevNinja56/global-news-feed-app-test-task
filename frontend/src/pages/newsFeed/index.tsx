import Card from '@/components/NewsFeed/Card';
import SmallLoader from '@/components/SmallLoader';
import { GOOGLE_DOMAIN, IS_FIRST_TIME } from '@/constant';
import { useProps } from '@/contexts/PropsContext';
import { useUserAuth } from '@/hooks/auth';
import { useUi } from '@/hooks/user-interface';
import { modalType } from '@/store/slices/ui.slice';
import { GetItemFromLocalStorage } from '@/utils/function';
import React, { useEffect } from 'react';

const NewsFeed = () => {
  const { updateModal } = useUi();
  const { isAuthenticated } = useUserAuth();

  const { newsLoading, newsData } = useProps();

  useEffect(() => {
    const value = GetItemFromLocalStorage(IS_FIRST_TIME);

    if (value === 'true') {
      updateModal({
        type: modalType.select_country_and_language_modal,
        state: '',
      });
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className='w-full'>
        <div className='w-11/12 mx-auto mt-28 flex flex-col gap-10'>
          <h1 className='text-4xl font-medium'>News Feed:</h1>
          <div className='flex flex-col gap-7'>
            {newsLoading ? (
              <div className='w-full h-[400px] font-semibold gap-3 flex items-center justify-center'>
                <SmallLoader /> Fetching news...
              </div>
            ) : newsData && newsData.length > 0 ? (
              newsData.map((news: any, index: number) =>
                news.photo_url && news.photo_url.includes(GOOGLE_DOMAIN) ? (
                  <Card key={index} news={news} />
                ) : (
                  ''
                )
              )
            ) : (
              'No news data available'
            )}
          </div>
        </div>
      </section>
    </>
  );
};

NewsFeed.layout = { auth: false };

export default NewsFeed;
