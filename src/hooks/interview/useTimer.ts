import { interviewTimeAtom } from '@/recoils/interview/atom';
import { ProgressStatus } from '@/types';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useTimer(
  timerState: ProgressStatus,
  setTimerState: (state: ProgressStatus) => void,
) {
  const time = useRecoilValue(interviewTimeAtom);
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    if (timerState === 'READY') setRemainingTime(time);
    if (timerState === 'PROGRESS') {
      const timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          setTimerState('DONE');
          clearInterval(timer);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [remainingTime, timerState]);

  return { remainingTime };
}
