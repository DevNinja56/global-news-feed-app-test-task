import React from 'react';
import { modalType } from '@/store/slices/ui.slice';
import ConfirmUserModal from './ConfirmUserModal';
import { useUi } from '@/hooks/user-interface';
import Modal from '@/components/Modal';
import CountryandLanguageModal from './CountryandLanguageModal';

const ModalWraper = () => {
  const { modal } = useUi();

  const AllModal = {
    [modalType.none]: <></>,
    [modalType.confirm_user_modal]: <ConfirmUserModal />,
    [modalType.select_country_and_language_modal]: <CountryandLanguageModal />,
  };

  return <>{modal && <Modal>{AllModal[modal]}</Modal>}</>;
};

export default ModalWraper;
