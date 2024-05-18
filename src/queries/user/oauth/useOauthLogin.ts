import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUserInfo } from '../useUserInfo';
import { useRecoilState } from 'recoil';
import { NickNameAtom } from '@/recoils/user/isNickName/atom';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';
import { isLoginErrorAtom } from '@/recoils/user/isRefresh/atom';

interface LoginError {
  message: string;
  status: number;
}

export const useOauthLogin = (key: string, loginFunc: (AUTHORIZATION_CODE: string) => void) => {
  const [nickState, setNickState] = useRecoilState(NickNameAtom);
  const [isNickOpen, setIsNickOpen] = useRecoilState(isNickAtom);
  const [isLoginError, setIsLoginError] = useRecoilState(isLoginErrorAtom);
  const { userInfoRefetch } = useUserInfo();
  const searchParams = useSearchParams();
  const AUTHORIZATION_CODE: string = searchParams.get('code') as string;
  const { data, isSuccess, error } = useQuery<any, LoginError>({
    queryKey: [key],
    queryFn: () => loginFunc(AUTHORIZATION_CODE),
  });
  useEffect(() => {
    if (isSuccess) {
      userInfoRefetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error?.status === 500) {
      setIsLoginError(true);
    }
    if (error?.status === 410) {
      setNickState({
        ...nickState,
        id: error.message,
      });
      setIsNickOpen(!isNickOpen);
    }
  }, [error]);
};
