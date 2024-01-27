import SmallLoader from '@/components/SmallLoader';
import Button from '@/components/common/Button';
import ImageSelectBox from '@/components/common/ImageSelectBox';
import {
  COUNTRY,
  COUNTRY_OPTIONS,
  IS_FIRST_TIME,
  LANGUAGE,
  LANGUAGE_OPTIONS,
} from '@/constant';
import { useProps } from '@/contexts/PropsContext';
import { useUi } from '@/hooks/user-interface';
import { SetItemInLocalStorage } from '@/utils/function';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { GrFormClose } from 'react-icons/gr';

const CountryAndLanguageModal = () => {
  const { hideModal } = useUi();

  const {
    selectBoxDisabled,
    countryValue,
    languageValue,
    setCountryValue,
    setLanguageValue,
    onGetNewsData,
  } = useProps();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      onGetNewsData(() => {
        SetItemInLocalStorage(IS_FIRST_TIME, false);
        hideModal();
        setLoading(false);
      });
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='bg-white px-10 py-5 rounded-md relative w-4/12 flex items-center flex-col'>
        <div className='w-full flex justify-start absolute top-3 left-3'>
          <GrFormClose
            onClick={() => {
              SetItemInLocalStorage(IS_FIRST_TIME, false);
              hideModal();
            }}
            className='cursor-pointer text-2xl text-red-500'
          />
        </div>

        <h1 className='text-2xl text-mainTextColor font-medium mb-8'>
          First Select Language and Country
        </h1>
        <div className='flex items-center flex-col gap-5 w-full'>
          <ImageSelectBox
            label='Select Country'
            placeHolder='Select Country'
            isDisabled={selectBoxDisabled}
            options={[
              {
                label: 'Select Country',
                value: '',
                isDisabled: true,
              },
              ...COUNTRY_OPTIONS,
            ]}
            value={COUNTRY_OPTIONS.filter(
              (item) => item.value === countryValue
            )}
            onChange={(e: any) => {
              setCountryValue(e.value);
              SetItemInLocalStorage(COUNTRY, e.value);
            }}
          />
          <ImageSelectBox
            label='Select Language'
            placeHolder='Select Language'
            isDisabled={selectBoxDisabled}
            options={[
              {
                label: 'Select Language',
                value: '',
                isDisabled: true,
              },
              ...LANGUAGE_OPTIONS,
            ]}
            value={LANGUAGE_OPTIONS.filter(
              (item) => item.value === languageValue
            )}
            onChange={(e: any) => {
              setLanguageValue(e.value);
              SetItemInLocalStorage(LANGUAGE, e.value);
            }}
          />
          {loading ? (
            <SmallLoader />
          ) : (
            <Button
              padding='py-2'
              className='w-full bg-red-500 rounded-md text-white font-medium transition-all duration-300 hover:bg-opacity-50'
              text='Get Started'
              onClick={onSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryAndLanguageModal;
