import { ROUTES } from '@/config/constant';
import { useUserAuth } from '@/hooks/auth';
import Link from 'next/link';
import React from 'react';

interface propTypes {
  className: string;
}

const ProfileDropDown = ({ className }: propTypes) => {
  const { logoutUser } = useUserAuth();

  return (
    <div
      className={`w-48 absolute right-0 top-12 2xl:top-20 shadow-lg py-2 bg-white rounded-xl translate-y-2 ${className} transition-all duration-300 z-10`}
    >
      <div className='flex flex-col gap-y-2'>
        <Link href={ROUTES.BOOKMARKS}>
          <p className='w-full transition-all duration-300 hover:bg-black hover:bg-opacity-10 pl-4 cursor-pointer py-2 text-sm 2xl:text-2xl font-medium'>
            Bookmarks
          </p>
        </Link>
        <p
          className='w-full transition-all duration-300 hover:bg-black hover:bg-opacity-10 pl-4 cursor-pointer py-2 text-sm 2xl:text-2xl font-medium'
          onClick={logoutUser}
        >
          Log Out
        </p>
      </div>
    </div>
  );
};

export default ProfileDropDown;
