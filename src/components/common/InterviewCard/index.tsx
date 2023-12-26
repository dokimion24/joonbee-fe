'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import { maskNickname } from '@/utils/format';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avartar';
import { VariableIcon } from '@/components/ui/VariableIcon';
import { QuestionCard } from '../QuestionCard';
import { Category } from '@/constants/category';
import { InterviewItemType } from '@/components/page/Main/InterviewSection';
import useSWRMutation from 'swr/mutation';
import { postInterviewLike } from '@/app/apis/services/member';

const InterviewCard = ({ props }: { props: InterviewItemType }) => {
  const [isFocus, setIsFocus] = useState(false);
  const { categoryName, thumbnail, likeCount, memberId, questions, interviewId } = props;
  const { trigger } = useSWRMutation('api/member/like', id => postInterviewLike(interviewId));

  const onOpenModal = () => {};

  const onClickLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    trigger();
  };

  return (
    <button
      onMouseOver={() => setIsFocus(true)}
      onMouseOut={() => setIsFocus(false)}
      className={`${
        isFocus && 'border-main-primary border-4 rounded-[20px]'
      } max-w-[330px] w-full flex-grow h-[392px] shadow-normal rounded-[20px] border-4 border-gray-normal`}>
      <div className="bg-[#252A32] h-[70px] p-[24px] shadow-normal rounded-t-[16px]">
        <h2 className="text-white text-[16px] font-bold">{Category[categoryName]}</h2>
      </div>
      <div className="h-[242px] px-[10px] py-[16px] flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-2 w-full max-w-[330px]">
          {questions.slice(0, 3).map((question: any) => (
            <QuestionCard key={question.questionId}>{question.questionContent}</QuestionCard>
          ))}
        </ul>
        <div>
          <Button size="xl" text="sm" color="blueTertiary" className="shadow-normal">
            <p>{categoryName !== '' && '질문 자세히 보기'}</p>
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center rounded-b-[20px] h-[80px] border-t border-t-gray-normal px-[28px] py-[12px]">
        <div className="flex gap-2">
          {thumbnail && <Avatar size="sm" thumbnail={thumbnail} />}
          {memberId && <p className="font-bold text-[16px]">by {maskNickname(memberId)}</p>}
        </div>
        <div className="flex gap-2 items-center">
          {categoryName !== '' && (
            <button onClick={onClickLike} className="p-1 ">
              <VariableIcon name="emptyLike" onClick={onOpenModal} />
            </button>
          )}
          <p className="font-bold text-[16px]">{likeCount}</p>
        </div>
      </div>
    </button>
  );
};

export default InterviewCard;
