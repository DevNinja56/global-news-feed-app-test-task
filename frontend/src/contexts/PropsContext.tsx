import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { createCtx } from './Context';
import { API_ENDPOINTS } from '@/config/Api_EndPoints';
import { fetchRequest } from '@/utils/axios/fetch';
import toast from 'react-hot-toast';
import { GetItemFromLocalStorage, ReplaceStrings } from '@/utils/function';
import { COUNTRY, LANGUAGE, SPLIT_FORMAT } from '@/constant';
import { useGetBookmarksQuery } from '@/store/slices/allRequests';
import { getToken } from '@/utils/axios/token';
import { bookmarkType } from '@/types';
import { useUserAuth } from '@/hooks/auth';

type PropsContextType = {
  countryValue: string;
  languageValue: string;
  newsData: any[];
  newsLoading: boolean;
  selectBoxDisabled: boolean;
  bookmarksData: bookmarkType[];
  bookmarksDataLoading: boolean;
  bookmarkList: bookmarkType[];
  setCountryValue: React.Dispatch<SetStateAction<string>>;
  setLanguageValue: React.Dispatch<SetStateAction<string>>;
  setNewsData: React.Dispatch<SetStateAction<any[]>>;
  setNewsLoading: React.Dispatch<SetStateAction<boolean>>;
  setSelectBoxDisabled: React.Dispatch<SetStateAction<boolean>>;
  setBookmarkList: React.Dispatch<SetStateAction<bookmarkType[] | any>>;
  onGetNewsByCountries: (country: string) => Promise<any>;
  onTranslateText: (language: string, text: string) => Promise<any>;
  onGetNewsData: (callback?: () => void) => void;
  refetchBookmarksData: () => void;
};

export const [useProps, CtxProvider] = createCtx<PropsContextType>();

export const PropsContext = createContext<PropsContextType | undefined>(
  undefined
);

export const PropsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = getToken();

  const { user } = useUserAuth();

  const [countryValue, setCountryValue] = useState<string>('');
  const [languageValue, setLanguageValue] = useState<string>('');

  const [newsLoading, setNewsLoading] = useState<boolean>(true);
  const [newsData, setNewsData] = useState<any[]>([]);

  const [selectBoxDisabled, setSelectBoxDisabled] = useState<boolean>(false);

  const [bookmarkList, setBookmarkList] = useState<bookmarkType[]>([]);

  useEffect(() => {
    setCountryValue(GetItemFromLocalStorage(COUNTRY) || 'us');
    setLanguageValue(GetItemFromLocalStorage(LANGUAGE) || 'en');
  }, []);

  useEffect(() => {
    if (languageValue && newsData && newsData.length > 0) {
      onTranslateExistingData(newsData);
    }
  }, [languageValue]);

  useEffect(() => {
    if (countryValue) {
      onGetNewsData();
    }
  }, [countryValue]);

  const {
    data: bookmarksData,
    isLoading: bookmarksDataLoading,
    refetch: refetchBookmarksData,
  } = useGetBookmarksQuery(
    { id: user.id },
    {
      refetchOnMountOrArgChange: true,
      skip: !token,
    }
  );

  useEffect(() => {
    setBookmarkList(bookmarksData ?? []);
  }, [bookmarksData]);

  const onGetNewsData = async (callback?: () => void) => {
    try {
      const data: any[] = await onGetNewsByCountries(countryValue);

      onTranslateExistingData(data);

      if (callback) callback();
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  const onTranslateExistingData = async (data: any[]) => {
    const allTitles = data.map((item) => item.title).join(SPLIT_FORMAT);
    const translatedData = await onTranslateText(languageValue, allTitles);
    setNewsData(ReplaceStrings(data, translatedData?.split(SPLIT_FORMAT)));
  };

  const onGetNewsByCountries = async (country: string): Promise<any> => {
    try {
      setNewsLoading(true);
      setSelectBoxDisabled(true);

      const response = await fetchRequest({
        url: `${API_ENDPOINTS.NEWS.GET_NEWS}?country=${country}`,
      });

      if (response.status === 200) {
        setNewsLoading(false);
        setSelectBoxDisabled(false);

        return response.data;
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  const onTranslateText = async (
    language: string,
    text: string
  ): Promise<any> => {
    try {
      setNewsLoading(true);
      setSelectBoxDisabled(true);

      const response = await fetchRequest({
        url: `${API_ENDPOINTS.TRANSLATION.ADD_TRANSLATION}`,
        type: 'post',
        body: {
          targetLang: language,
          text: text,
        },
      });

      if (response.status === 200) {
        setNewsLoading(false);
        setSelectBoxDisabled(false);

        return response.data;
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };

  return (
    <CtxProvider
      value={{
        countryValue,
        languageValue,
        newsData,
        newsLoading,
        selectBoxDisabled,
        bookmarksData: bookmarksData ?? [],
        bookmarksDataLoading,
        bookmarkList,
        setBookmarkList,
        setCountryValue,
        setLanguageValue,
        setNewsData,
        setNewsLoading,
        setSelectBoxDisabled,
        onGetNewsByCountries,
        onTranslateText,
        onGetNewsData,
        refetchBookmarksData,
      }}
    >
      {children}
    </CtxProvider>
  );
};

export default PropsProvider;
