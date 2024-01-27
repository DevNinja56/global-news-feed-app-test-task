import { useUi } from '@/hooks/user-interface';
import React from 'react';

const Modal: React.FC<{
  children: React.ReactElement;
  onClose?: () => void;
}> = ({ children, onClose }) => {
  const { hideModal } = useUi();
  return (
    <div
      className='fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-25 flex items-center justify-center z-[999] overflow-y-auto m-auto py-5'
      onClick={onClose ?? hideModal}
    >
      <div className='relative w-full' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
