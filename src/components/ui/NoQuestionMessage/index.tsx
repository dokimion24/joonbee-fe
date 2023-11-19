import React from 'react';
import { Icon } from '../Icon';

export default function NoQuestionsMessage() {
  return (
    <>
      <div className="w-[270px] flex flex-col items-center gap-3">
        <Icon name="blank" />
        <p className="text-[#444] font-bold text-[20px] text-center">등록된 질문이 없습니다</p>
        <div className="shadow-md w-[270px] rounded-[8px] bg-white p-[18px]">
          <p className="text-[#444] font-bold text-[20px] text-center">질문 추가 하기</p>
          <p className="text-[12px] text-center">질문들을 등록할 수 있어요</p>
        </div>
      </div>
    </>
  );
}
