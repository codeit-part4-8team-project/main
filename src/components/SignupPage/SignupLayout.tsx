import { ReactNode, useState } from 'react';
import TextButton from '../common/TextButton';

function SignupLayout({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  return (
    <div className="flex w-[112rem] basis-[67.7rem] flex-col items-center justify-between rounded-[2.4rem] bg-white px-[19rem]">
      <div className="text-gray30 mt-12 text-[1.4rem] font-bold leading-[2.4rem]">
        <span>약관동의 &gt; </span>
        <span>정보입력 &gt; </span>
        <span>가입완료</span>
      </div>
      {children}
      <TextButton buttonSize="md" className="mb-[5.4rem]">
        {step !== 3 ? '다음 단계' : '지금 바로 시작하기'}
      </TextButton>
    </div>
  );
}

export default SignupLayout;
