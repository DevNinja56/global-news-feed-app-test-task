import SmallLoader from '@/components/SmallLoader';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { API_ENDPOINTS } from '@/config/Api_EndPoints';
import { ROUTES } from '@/config/constant';
import { useUserAuth } from '@/hooks/auth';
import { signInForm } from '@/types';
import { fetchRequest } from '@/utils/axios/fetch';
import { signInFormSchema } from '@/utils/formSchemas';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsFillEyeSlashFill } from 'react-icons/bs';
import { IoArrowBackCircleOutline, IoEyeSharp } from 'react-icons/io5';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserDetails, loggedInUser } = useUserAuth();
  const { push } = useRouter();
  const {
    register,
    handleSubmit: fromSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: signInFormSchema });

  const handleSubmit = (body: signInForm) => {
    setIsLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.AUTH.SIGN_IN,
      type: 'post',
      body,
    })
      .then((res) => {
        updateUserDetails(res.data.user);
        loggedInUser({
          access: res.data.accessToken,
          refresh: res.data.refreshToken,
        });
        push(ROUTES.HOMEPAGE);
        toast.success('User Logged In Success');
      })
      .catch((err) => {
        setError('password', {
          type: 'custom',
          message: err.response.data.message,
        });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <main className='h-screen w-full flex items-center justify-center bg-stone-300 relative'>
      <Link href={ROUTES.HOMEPAGE}>
        <IoArrowBackCircleOutline className='absolute top-4 left-5 text-5xl text-red-500 hover:opacity-50 transition-all duration-300 cursor-pointer' />
      </Link>
      <div className='w-4/12 bg-white rounded-xl shadow-lg py-7 flex flex-col items-center gap-4 px-10'>
        <Image
          height={80}
          width={80}
          priority
          alt='login'
          src='/images/login.jpg'
        />
        <div className='flex flex-col items-center gap-2 mb-3'>
          <h1 className='text-2xl text-black font-bold'>
            Sign in to your account
          </h1>
          <p>
            Don't have an account?{' '}
            <Link href={ROUTES.SIGN_UP}>
              <span className='hover:text-red-500 transition-all duration-300 cursor-pointer'>
                Sign up.
              </span>
            </Link>
          </p>
        </div>
        <form
          onSubmit={fromSubmit(handleSubmit)}
          className='flex flex-col gap-4 w-full'
        >
          <Input
            {...register('email', {
              required: true,
            })}
            className='w-full py-3 rounded-lg border border-gray-400 pl-4 outline-none focus:border-red-500 transition-all duration-500'
            placeHolder='Email address'
            error={errors.email?.message}
          />
          <div className='relative'>
            <Input
              {...register('password', {
                required: true,
              })}
              error={errors.password?.message}
              className='w-full py-3 rounded-lg border border-gray-400 pl-4 outline-none focus:border-red-500 transition-all duration-500'
              placeHolder='Password'
              type={!showPassword ? 'text' : 'password'}
            />
            {showPassword ? (
              <IoEyeSharp
                className='text-red-500 absolute top-4 right-4 text-xl cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <BsFillEyeSlashFill
                className='text-red-500 absolute top-4 right-4 text-xl cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {isLoading ? (
            <div className='w-full flex items-center justify-center gap-3'>
              <SmallLoader />
            </div>
          ) : (
            <Button
              padding='py-3'
              className='w-full rounded-lg bg-red-500 text-white font-medium text-lg transition-all duration-500 hover:bg-opacity-50'
              text='Sign in'
            />
          )}
        </form>
      </div>
    </main>
  );
};

SignIn.layout = { header: false, isPublic: true };

export default SignIn;
