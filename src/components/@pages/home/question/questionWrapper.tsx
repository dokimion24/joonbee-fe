'use client';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { QuestionSaveIcon } from './questionSaveIcon';
import { useGetQuestion } from '@/queries/question/useGetQuestion';
import { CenterSectionWrapper } from '@/components/wrapper/centerSectionWrapper';
import ModalPortal from '@/components/@common/modalPortal';
import { CommonModal } from '@/components/@common/commonModal';
import { useRecoilState } from 'recoil';
import { isSaveQuestion } from '@/recoils/user/isSaveQuestion/atom';

export const QuestionWrapper = () => {
  const [isOpen, setIsOpen] = useRecoilState(isSaveQuestion);

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const { questionData, error, isFetching, isFetchingNextPage, status, setTarget } =
    useGetQuestion();
  return (
    <div className="flex h-full w-full justify-center overflow-auto">
      <CenterSectionWrapper>
        {categoryParams === 'question' && (
          <ul className=" flex flex-col gap-4 interviewListHeight pt-14">
            {questionData &&
              questionData.map((item, i) => (
                <li key={item.questionId} className="flex gap-2 h-10 items-start">
                  <div className="flex gap-2">
                    <VariableIcon name="questionBox" size={18} />
                    <Text size="lg">{item.questionContent}</Text>
                  </div>
                  <QuestionSaveIcon
                    subcategoryName={item.subcategoryName}
                    questionContent={item.questionContent}
                  />
                </li>
              ))}
            <div ref={setTarget}>ㅤ</div>
          </ul>
        )}

        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        {isOpen && (
          <ModalPortal>
            <CommonModal isModalOpen={isOpen} setIsModalOpen={setIsOpen}>
              <Text size="xl" className="text-blue-secondary w-full" weight="lg">
                질문을 저장했습니다.
              </Text>
            </CommonModal>
          </ModalPortal>
        )}
      </CenterSectionWrapper>
    </div>
  );
};
