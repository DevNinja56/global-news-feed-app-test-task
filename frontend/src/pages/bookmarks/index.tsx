import BookmarkCard from '@/components/Bookmark/Card';
import { useProps } from '@/contexts/PropsContext';
import { bookmarkType } from '@/types';
import React from 'react';

const Bookmarks = () => {
  const { bookmarkList, refetchBookmarksData } = useProps();

  return (
    <>
      <section className='w-full'>
        <div className='w-11/12 mx-auto mt-28 flex flex-col gap-10'>
          <h1 className='text-4xl font-medium'>Bookmarks:</h1>
          <div className='grid grid-cols-3 gap-5'>
            {bookmarkList.length > 0 ? (
              bookmarkList?.map((bookmark: bookmarkType, index: number) => (
                <BookmarkCard
                  key={'bookmark' + index}
                  bookmark={bookmark}
                  refetch={refetchBookmarksData}
                />
              ))
            ) : (
              <h1 className='text-2xl font-medium'>No Bookmark Found!</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

Bookmarks.layout = { auth: false };

export default Bookmarks;
