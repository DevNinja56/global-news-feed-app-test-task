import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  port: +process.env.APP_PORT || 3001,
  database: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/development',
  },
  jwt: {
    jwt_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
    jwt_token_expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || '',
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    jwt_refresh_token_expiration:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '',
  },
  real_time_news_data: {
    url: process.env.REAL_TIME_NEWS_DATA_URL || '',
    api_key: process.env.REAL_TIME_NEWS_DATA_API_KEY || '',
    api_host: process.env.REAL_TIME_NEWS_DATA_API_HOST || '',
  },
  google_translate: {
    url: process.env.GOOGLE_TRANSLATE_URL || '',
    api_key: process.env.GOOGLE_TRANSLATE_API_KEY || '',
    api_host: process.env.GOOGLE_TRANSLATE_API_HOST || '',
  },
});
