import { SERVER_ENV } from '@/main/config/env';

export const sessionConfig = {
  secret: SERVER_ENV.secretSession,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: SERVER_ENV.cookieSecure,
    maxAge: SERVER_ENV.cookieMaxAge,
  },
};
