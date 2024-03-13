import { useState } from 'react';
import CompleteStepContent from '@/components/SignupPage/CompleteStepContent';
import EnterUserStepContent from '@/components/SignupPage/EnterUserStepContent';
import SignupLayout from '@/components/SignupPage/SignupLayout';
import ToSStepContent from '@/components/SignupPage/ToSStepContent';

const SignupPage = () => {
  return (
    <div className="bg-gray100 flex min-h-screen flex-col items-center pt-[18.9rem]">
      <div className="bg-gray10 fixed top-0 flex h-[5.8rem] w-full justify-center">
        <img src="/public/assets/logo.svg" alt="Keepy-Uppy 로고" width={70} height={41}></img>
      </div>
      <SignupLayout>
        <ToSStepContent />
      </SignupLayout>
      <footer></footer>
    </div>
  );
};

export default SignupPage;
