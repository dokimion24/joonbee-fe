import QuestionSettingButton from '@/components/page/interview/random/QuestionSettingButton';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import React from 'react';

export default function RandomPage() {
  return (
    <div className="h-full flex justify-center items-center bg-main-primary">
      <section className="w-[1024px] h-[706px] flex flex-col gap-5 bg-background-lightgray p-8 rounded-[40px] relative">
        <h2 className="text-[20px] font-bold">랜덤 질문을 준비해주세요</h2>
        <QuestionSettingButton />
        <Link href="/interview/permission">
          <Button color="blueSecondary" size="lg" className="absolute bottom-9 right-[50px]">
            랜덤 면접 질문 보기
          </Button>
        </Link>
      </section>
    </div>
  );
}
