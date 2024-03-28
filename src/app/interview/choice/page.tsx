'use client';

import Button from '@/components/@common/button';
import { Text } from '@/components/@common/text';
import { interviewTypeAtom } from '@/recoils/interview/atom';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function ChoicePage() {
  const [, setInterviewType] = useRecoilState(interviewTypeAtom);

  useEffect(() => {
    setInterviewType('choice');
  }, []);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-inline items-center gap-5">
        <div className="w-[180px] h-[150px]">
          <Image src="/fluid.png" alt="랜덤면접" width={180} height={180} />
        </div>
        <div>
          <Text size="lg" as="h4" weight="lg">
            질문을 직접 선택해요
          </Text>
          <Text color="lightGray">
            면접 질문들을 선택해서 준비할 수 있어요
            <br />
            체계적으로 준비해봐요!
          </Text>
        </div>
        <Link href="/interview/choice/setting">
          <Button size="xl">면접 시작하기</Button>
        </Link>
      </div>
    </>
  );
}
