'use client';
import React from 'react';
import Image from 'next/image';
import authApis from '@/apis/services/authApis';
import { useOauthLogin } from '@/queries/user/oauth/useOauthLogin';

export default function OauthPage() {
  useOauthLogin('/naver', authApis.naverLogin);
  return (
    <div className="w-full mainBg questionListHeight">
      <div className="flex flex-col h-full items-center justify-center">
        <Image src={'/loginLoading.gif'} width={250} height={250} alt="loding" />
      </div>
    </div>
  );
}
