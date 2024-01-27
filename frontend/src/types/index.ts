export interface userType {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type signInForm = {
  email: string;
  password: string;
};

export type signUpForm = {
  username: string;
  email: string;
  password: string;
};

export type selectCountryAndLanguageForm = {
  country: string;
  targetLang: string;
};

export type bookmarkType = {
  title: string;
  link: string;
  photoUrl: string;
  publishedDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
