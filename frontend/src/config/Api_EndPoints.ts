export const API_ENDPOINTS = {
  AUTH: {
    SIGN_UP: '/auth/signup',
    SIGN_IN: '/auth/signin',
    VERIFY_USER: '/auth/verify-user',
    LOG_OUT: '/auth/logout',
  },
  BOOKMARK: {
    GET_USER_BOOKMARKS: '/bookmark/user/:id',
    ADD_BOOKMARK: '/bookmark',
    DELETE_BOOKMARK: '/bookmark',
  },
  NEWS: {
    GET_NEWS: '/news',
  },
  TRANSLATION: { ADD_TRANSLATION: '/translation/text' },
};
