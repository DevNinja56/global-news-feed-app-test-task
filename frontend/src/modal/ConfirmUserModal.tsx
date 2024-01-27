import Button from '@/components/common/Button';
import { ROUTES } from '@/config/constant';
import { useUi } from '@/hooks/user-interface';
import { useRouter } from 'next/router';
import React from 'react';
import { GrFormClose } from 'react-icons/gr';

const ConfirmUserModal = () => {
  const { hideModal } = useUi();
  const { push } = useRouter();

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div
        style={{ padding: '12px' }}
        className='bg-white p-20 rounded-md w-4/12 flex items-center flex-col'
      >
        <div className='w-full flex justify-end'>
          <GrFormClose
            onClick={hideModal}
            className='cursor-pointer text-2xl text-red-500'
          />
        </div>
        <h1 className='text-2xl text-mainTextColor font-medium mb-8'>
          Please Log In First
        </h1>
        <div className='flex items-center gap-3 w-full'>
          <Button
            padding='py-3'
            className='rounded-lg bg-red-500 text-white font-medium w-full'
            text='Log In'
            onClick={() => {
              hideModal();
              push(ROUTES.SIGN_IN);
            }}
          />
          <Button
            onClick={hideModal}
            padding='py-3'
            className='rounded-lg border border-red-500 bg-white font-medium w-full'
            text='Cancel'
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmUserModal;
