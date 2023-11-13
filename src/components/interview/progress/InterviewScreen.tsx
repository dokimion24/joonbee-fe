'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { InterviewBar } from '@/components/common/InterviewBar';
import { QuestrionCard } from '@/components/common/QuestionCard';
import Timer from '@/components/common/Timer';
import Webcam from '@/components/common/Webcam';
import { interviewQuestionState } from '@/recoil/interviewQuestion/atom';
import { TimerState } from '@/types';
import useVideo from '@/hooks/useVideo';

const InterviewScreen = () => {
  const interviewQuestion = useRecoilValue(interviewQuestionState);
  const questionCount = interviewQuestion.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(interviewQuestion.questions[0]);
  const [timerState, setTimerState] = useState<TimerState>('READY');
  const [btnText, setBtnText] = useState('시작하기');
  const { videoRef, onStartAudio, onStartVideo, onStartRecord, onStopRecord } = useVideo();

  const router = useRouter();

  useEffect(() => {
    if (timerState === 'DONE') {
      onStopRecord();
      setBtnText(
        currentQuestion.questionId === questionCount
          ? '면접결과 확인하기'
          : '다음 질문으로 넘어가기',
      );
    }
  }, [timerState, currentQuestion, questionCount]);

  const onDoneButtonClick = () => {
    if (currentQuestion.questionId < questionCount) {
      setBtnText('시작하기');
      setCurrentQuestion(interviewQuestion.questions[currentQuestion.questionId]);
    } else {
      router.push('/interview/check');
    }
  };

  const onClickBtn = () => {
    switch (timerState) {
      case 'READY':
        setBtnText('음성 인식 중');
        setTimerState('PROGRESS');
        onStartRecord();
        break;
      case 'PROGRESS':
        setTimerState('DONE');
        break;
      case 'DONE':
        setTimerState('READY');
        onDoneButtonClick();
        break;
      default:
        break;
    }
  };

  const onDisableBtn = () => {
    return timerState === 'PROGRESS';
  };

  return (
    <section className="h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px] overflow-scroll">
      <InterviewBar questions={interviewQuestion.questions} />
      <h2 className="font-bold text-[32px]">질문 {currentQuestion.questionId}</h2>
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <Webcam isPermitVideo={true} onStartVideo={onStartVideo} videoRef={videoRef} />
          <div className="flex justify-center">
            <Timer timerState={timerState} setTimerState={setTimerState} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <QuestrionCard size="lg">{currentQuestion.questionContent}</QuestrionCard>
          <TextArea />
          <Button size="4xl" onClick={onClickBtn} disabled={onDisableBtn()}>
            {btnText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InterviewScreen;
