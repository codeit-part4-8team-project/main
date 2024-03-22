import CompleteStepContent from '@/components/SignupPage/CompleteStepContent';
import EnterUserStepContent from '@/components/SignupPage/EnterUserStepContent';
import SignupLayout from '@/components/SignupPage/SignupLayout';
import ToSStepContent from '@/components/SignupPage/ToSStepContent';

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray100 pt-[18.9rem]">
      <div className="fixed top-0 flex h-[5.8rem] w-full justify-center bg-gray10">
        <img src="/public/assets/logo.svg" alt="Keepy-Uppy 로고" width={70} height={41}></img>
      </div>
      <SignupLayout>
        <EnterUserStepContent />
      </SignupLayout>
      <footer></footer>
    </div>
  );
};

export default SignupPage;
