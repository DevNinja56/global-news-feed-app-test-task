import SmallLoader from '@/components/SmallLoader';
import { API_ENDPOINTS } from '@/config/Api_EndPoints';
import { useProps } from '@/contexts/PropsContext';
import { bookmarkType } from '@/types';
import { fetchRequest } from '@/utils/axios/fetch';
import { FormatDate } from '@/utils/function';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDeleteOutline } from 'react-icons/md';

const BookmarkCard = ({
  bookmark,
  refetch,
}: {
  bookmark: bookmarkType;
  refetch: () => void;
}) => {
  const { bookmarkList, setBookmarkList } = useProps();
  const [loading, setLoading] = useState(false);

  const deleteBookmarkById = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetchRequest({
        url: `${API_ENDPOINTS.BOOKMARK.DELETE_BOOKMARK}/${id}`,
        type: 'delete',
      });

      if (response.status === 200) {
        const filteredData = bookmarkList.filter(
          (bookmark: bookmarkType) => bookmark.id !== id
        );
        setBookmarkList(filteredData);
        toast.success('Bookmark deleted successfully');
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-3 w-full'>
      <Image
        height={250}
        width={550}
        alt='card-img'
        src={bookmark?.photoUrl}
        className='w-full h-[250px] rounded-xl object-cover'
        priority
      />
      <div className='flex flex-col justify-between py-5 gap-3'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-gray-600 font-medium italic'>
            {bookmark?.publishedDate ? FormatDate(bookmark?.publishedDate) : ''}
          </p>
          {!loading && (
            <MdDeleteOutline
              onClick={() => deleteBookmarkById(bookmark?.id)}
              className='text-red-500 text-2xl cursor-pointer transition-all duration-300 hover:opacity-50'
            />
          )}
          {loading && <SmallLoader />}
        </div>
        <h1 className='text-xl font-bold leading-snug'>{bookmark?.title}</h1>
      </div>
    </div>
  );
};

export default BookmarkCard;
