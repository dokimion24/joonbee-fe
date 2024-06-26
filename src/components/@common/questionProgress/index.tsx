import { ProgressStatus } from '@/types';
import React from 'react';
import { Icon } from '../icon';
import { Text, TextColor } from '../text';

interface IQuestionProgress {
  progressStatus?: ProgressStatus;
  text: string;
  className?: string;
}

const PROGRESS_STATUS = {
  READY: {
    check: false,
    text: '',
    color: 'lightGray' as TextColor,
  },
  PROGRESS: {
    check: false,
    text: '진행중',
    color: 'black' as TextColor,
  },
  DONE: {
    check: true,
    text: '완료',
    color: 'lightGray' as TextColor,
  },
};

export default function QuestionProgress({
  progressStatus = 'PROGRESS',
  text,
  className,
}: IQuestionProgress) {
  const { check, text: statusText, color } = PROGRESS_STATUS[progressStatus];
  const colorStyles = color === 'lightGray' ? 'bg-gray-normal' : 'bg-[#4F7EEC]';
  const borderStyles = progressStatus !== 'PROGRESS' ? 'border-gray-normal' : 'border-black';

  return (
    <div className={`flex gap-3 items-center ${className}`}>
      <div className={`relative w-4 h-4 rounded-full ${colorStyles}`}>
        {check && <Icon name="check.png" />}
      </div>
      <Text color={color} size="lg">
        {text}
      </Text>
      {progressStatus !== 'READY' && (
        <div className={`w-16 border-t border-dashed ${borderStyles}`}></div>
      )}
      <Text color={color} size="md">
        {statusText}
      </Text>
    </div>
  );
}
