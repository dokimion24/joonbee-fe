'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { RadiusButton } from '@/components/common/RadiusButton';

import Webcam from '@/components/common/Webcam';
import useVideo from '@/hooks/useVideo';

const audioConstraints = {
  audio: true,
};

const DeviceControl = () => {
  const [isPressedVideoBtn, setIsPressedVideoBtn] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const { videoRef, onStartVideo } = useVideo();

  const router = useRouter();

  const onToggleVideo = async () => {
    setIsPressedVideoBtn(prev => !prev);
  };

  const onStartAudio = async () => {
    console.log('onStartAudio');
    const stream = await navigator.mediaDevices.getUserMedia(audioConstraints);
    setAudioStream(stream);
  };

  const onNavigate = () => {
    router.push('/interview/start');
  };

  const isDisableNextBtn = () => {
    return !audioStream || !audioStream.active;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Webcam isPermitVideo={isPressedVideoBtn} size="md" className="mb-10" videoRef={videoRef} onStartVideo={onStartVideo} />
      <div>
        <div className="flex justify-between mb-6">
          <RadiusButton color="light" text="md" size="sm" onClick={onStartAudio}>
            마이크 권한 설정
          </RadiusButton>
          <RadiusButton color="light" text="md" size="sm" onClick={onToggleVideo}>
            카메라 권한 설정
          </RadiusButton>
        </div>
        <RadiusButton
          color="blue"
          text="md"
          size="md"
          onClick={onNavigate}
          disabled={isDisableNextBtn()}>
          다음
        </RadiusButton>
      </div>
    </div>
  );
};

export default DeviceControl;