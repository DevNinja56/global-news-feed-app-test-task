import SmallLoader from '@/components/SmallLoader';
import Button from '@/components/common/Button';
import { API_ENDPOINTS } from '@/config/Api_EndPoints';
import { useProps } from '@/contexts/PropsContext';
import { useUserAuth } from '@/hooks/auth';
import { useUi } from '@/hooks/user-interface';
import { modalType } from '@/store/slices/ui.slice';
import { bookmarkType } from '@/types';
import { fetchRequest } from '@/utils/axios/fetch';
import { FormatDate } from '@/utils/function';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBookmark } from 'react-icons/fa';
import { GrLinkNext } from 'react-icons/gr';

const Card: React.FC<{ news: any }> = ({ news }) => {
  const { isAuthenticated, user } = useUserAuth();
  const { updateModal } = useUi();
  const { bookmarkList, setBookmarkList, refetchBookmarksData } = useProps();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = () => {
    try {
      const { title, photo_url, source_url, published_datetime_utc } = news;
      setLoading(true);

      if (!isAuthenticated) {
        updateModal({
          type: modalType.confirm_user_modal,
          state: '',
        });

        return;
      }

      const payload = {
        title,
        link: source_url,
        photoUrl: photo_url,
        publishedDate: published_datetime_utc,
        userId: user.id,
      };

      onAddToBookmark(payload);
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  const onAddToBookmark = async (payload: any) => {
    try {
      const response = await fetchRequest({
        url: `${API_ENDPOINTS.BOOKMARK.ADD_BOOKMARK}`,
        type: 'post',
        body: payload,
      });

      if (response.status === 200) {
        setBookmarkList([...bookmarkList, payload]);
        refetchBookmarksData();
        toast.success('Added to Bookmarks!');
        setLoading(false);
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      {news ? (
        <div className='w-full flex gap-8'>
          <Image
            height={250}
            width={350}
            alt='card-img'
            src={news.photo_url}
            className='w-full h-full rounded-xl object-cover'
            priority
          />
          <div className='w-full flex flex-col justify-between py-5 gap-3'>
            <div className='flex flex-col gap-5'>
              <div className='w-full flex items-center justify-between'>
                <p className='text-gray-600 font-medium italic'>
                  {news.published_datetime_utc
                    ? FormatDate(news.published_datetime_utc)
                    : ''}
                </p>
                {loading ? (
                  <SmallLoader />
                ) : (
                  <FaBookmark
                    onClick={onSubmit}
                    className={`${
                      bookmarkList.find(
                        (item: bookmarkType) => item.photoUrl === news.photo_url
                      )
                        ? 'text-red-500'
                        : 'text-gray-400'
                    } text-2xl cursor-pointer transition-all duration-300 hover:opacity-50`}
                  />
                )}
              </div>
              <h1 className='text-3xl font-bold leading-snug'>{news.title}</h1>
            </div>
            <div>
              <Button
                padding='py-2 px-6'
                className='bg-red-500 text-white rounded-md transition-all duration-300 hover:bg-opacity-55 flex items-center gap-2'
                text='Read more'
                icon2={<GrLinkNext className='text-white text-sm mt-[3px]' />}
                onClick={() => window.open(news.source_url)}
              />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Card;
