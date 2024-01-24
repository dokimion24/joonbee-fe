'use client';
import React, { MouseEvent } from 'react';
import Logo from '@/components/ui/Logo';
import { SocialLoginButton } from '../SocialLoginButton';

const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/kakao';
const NAVER_REDIRECT_URI = 'http://localhost:3000/oauth/naver';
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/oauth/google';
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  process.env.NEXT_PUBLIC_NAVER_CLIENT_KEY
}&redirect_uri=${NAVER_REDIRECT_URI}&state=${Math.random().toString(36).substring(3, 14)}`;

const GOOGLE_AUTH_URL =
  'https://accounts.google.com/o/oauth2/auth?' +
  `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY}&` +
  `redirect_uri=${GOOGLE_REDIRECT_URI}&` +
  'response_type=code&' +
  'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
export const LoginBox = () => {
  const onClickOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClickOpen}
      className="fixed z-40 border-main-primary border-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[390px] h-[550px] rounded-[50px] bg-white shadow-md flex items-center justify-center">
      <div className="flex items-center flex-col">
        <Logo size={'lg'} />
        <p className="text-[30px] mt-7 mb-10 font-bold text-blue-secondary">JOONBEE 하세요.</p>
        <div className="flex flex-col gap-3">
          <SocialLoginButton
            name="kakao"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URI;
            }}
          />
          <SocialLoginButton
            name="naver"
            onClick={() => {
              window.location.href = NAVER_AUTH_URL;
            }}
          />
          <SocialLoginButton
            name="google"
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL;
            }}
          />
        </div>
      </div>
    </div>
  );
};
