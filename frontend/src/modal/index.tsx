import React from 'react';
import { modalType } from '@/store/slices/ui.slice';
import ConfirmUserModal from './ConfirmUserModal';
import { useUi } from '@/hooks/user-interface';
import Modal from '@/components/Modal';
import CountryAndLanguageModal from './CountryandLanguageModal';

const ModalWraper = () => {
  const { modal } = useUi();

  const AllModal: any = {
    [modalType.none]: <></>,
    [modalType.confirm_user_modal]: <ConfirmUserModal />,
    [modalType.select_country_and_language_modal]: <CountryAndLanguageModal />,
  };

  return <>{modal && <Modal>{AllModal[modal]}</Modal>}</>;
};

export default ModalWraper;
