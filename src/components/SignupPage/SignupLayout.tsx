import { MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import TextButton from '../common/TextButton';
import { useStepContext } from '@/contexts/SignupStepProvider';
import { useUserContext } from '@/contexts/UserProvider';

function SignupLayout({ children }: { children: ReactNode }) {
  const { user } = useUserContext();
  const { step, setStep, formValidity } = useStepContext();
  const navigate = useNavigate();

  const handleHeaderStepClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLSpanElement) {
      const clickedStep = Number(event.target.id);
      if (clickedStep < step) {
        setStep(clickedStep);
      }
    }
  };

  const handleNextStepButtonClick = (currentStep: number) => {
    if (currentStep === 3) {
      return () => {
        navigate(`/user/${user?.id}/main`);
      };
    }
  };

  const setFormAttributeOfButtonElement = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return 'ToSForm';
      case 2:
        return 'enterUserForm';
      default:
        return undefined;
    }
  };

  return (
    <div className="flex w-[112rem] basis-[67.7rem] flex-col items-center justify-between rounded-[2.4rem] bg-white px-[19rem]">
      <div className="mt-12 text-body3-bold text-gray30" onClick={handleHeaderStepClick}>
        <span id="1" className={clsx(step === 1 ? 'text-gray80' : '')}>
          약관동의 &gt;{' '}
        </span>
        <span id="2" className={clsx(step === 2 ? 'text-gray80' : '')}>
          정보입력 &gt;{' '}
        </span>
        <span id="3" className={clsx(step === 3 ? 'text-gray80' : '')}>
          가입완료
        </span>
      </div>
      {children}
      <TextButton
        buttonSize="md"
        className="mb-[5.4rem]"
        form={setFormAttributeOfButtonElement(step)}
        onClick={handleNextStepButtonClick(step)}
        disabled={!formValidity}
      >
        {step !== 3 ? '다음 단계' : '지금 바로 시작하기'}
      </TextButton>
    </div>
  );
}

export default SignupLayout;
