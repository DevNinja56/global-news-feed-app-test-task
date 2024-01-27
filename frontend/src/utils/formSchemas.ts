import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const signUpFormSchema = yupResolver(
  Yup.object().shape({
    username: Yup.string()
      .required('Name is Required *')
      .min(3, 'Min 3 Characters'),
    email: Yup.string()
      .required('Email is Required *')
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid Email'
      ),
    password: Yup.string()
      .required('Password is Required *')
      .min(7, 'Min 7 Characters !'),
  })
);

export const signInFormSchema = yupResolver(
  Yup.object().shape({
    email: Yup.string().required('Email is Required *'),
    password: Yup.string()
      .required('Password is Required *')
      .min(7, 'Min 7 Characters !'),
  })
);

export const selectCountryAndLanguageSchema = yupResolver(
  Yup.object().shape({
    country: Yup.string().required('Country is Required *'),
    targetLang: Yup.string().required('Language is Required *'),
  })
);
