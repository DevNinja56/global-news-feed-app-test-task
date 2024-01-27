import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Button from '../common/Button';
import ImageSelectBox from '../common/ImageSelectBox';
import {
  COUNTRY,
  COUNTRY_OPTIONS,
  LANGUAGE,
  LANGUAGE_OPTIONS,
} from '@/constant';
import Link from 'next/link';
import { ROUTES } from '@/config/constant';
import { useUserAuth } from '@/hooks/auth';
import ProfileDropDown from '../common/ProfileDropDown';
import { useProps } from '@/contexts/PropsContext';
import { SetItemInLocalStorage } from '@/utils/function';
import { useRouter } from 'next/router';

const Header = () => {
  const { pathname } = useRouter();

  const { isAuthenticated, user } = useUserAuth();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const {
    selectBoxDisabled,
    countryValue,
    languageValue,
    setCountryValue,
    setLanguageValue,
  } = useProps();

  return (
    <div className='w-full flex items-center justify-between bg-black px-12 fixed top-0'>
      <div className='flex gap-10 items-center'>
        <Link href={ROUTES.HOMEPAGE}>
          <h1 className='text-white font-bold text-2xl cursor-pointer'>
            Global News Feed App
          </h1>
        </Link>
        {pathname !== ROUTES.HOMEPAGE && (
          <Link href={ROUTES.NEWS_FEED}>
            <p className='text-white cursor-pointer font-semibold hover:underline'>
              News Feed
            </p>
          </Link>
        )}
      </div>
      <div className='flex justify-end items-center gap-5 py-3 w-5/12'>
        {pathname === ROUTES.NEWS_FEED ? (
          <div className='flex items-center gap-5 w-full'>
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
          </div>
        ) : (
          ''
        )}
        {isAuthenticated ? (
          <div
            onClick={() => setShowDropDown(!showDropDown)}
            className='w-[200px] relative mr-4 md:mr-6 lg:mr-0 lg:pr-0'
          >
            <Button
              padding='py-2 px-4'
              className='w-full relative bg-white flex items-center gap-3 text-sm lg:text-base 2xl:text-2xl font-semibold rounded-md capitalize'
              icon2={
                <FaAngleDown className='mt-[2px] absolute top-[50%] translate-y-[-50%] right-3 text-black' />
              }
              text={user.username}
              img={'/images/userImg.png'}
            />
            <ProfileDropDown
              className={`${
                showDropDown ? 'opacity-1 visible' : 'opacity-0 invisible'
              }`}
            />
          </div>
        ) : (
          <>
            <Link href={ROUTES.SIGN_IN}>
              <Button
                padding='py-2 px-6'
                className='whitespace-nowrap rounded-md border border-red-500 transition-all duration-300 text-red-500 hover:bg-red-500 hover:text-white font-medium min-w-fit'
                text='Log in'
              />
            </Link>
            <Link href={ROUTES.SIGN_UP}>
              <Button
                padding='py-2 px-6'
                className='whitespace-nowrap rounded-md bg-red-500 text-white hover:bg-opacity-80 transition-all duration-300 font-medium min-w-fit'
                text='Sign up'
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
