import CompletionStepContent from '@/components/SignupPage/CompletionStepContent';
import EnterUserStepContent from '@/components/SignupPage/EnterUserStepContent';
import SignupLayout from '@/components/SignupPage/SignupLayout';
import ToSStepContent from '@/components/SignupPage/ToSStepContent';
import { useStepContext } from '@/contexts/SignupStepProvider';
import KeepyUppyIcon from '@/assets/KeepyUppyIcon';
import KeepyUppyLogo from '@/assets/KeepyUppyLogo';

const SignupPage = () => {
  const { step } = useStepContext();
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray100 pt-[18.9rem]">
      <div className="fixed top-0 flex h-[5.8rem] w-full items-center justify-center gap-[0.8rem] bg-gray10">
        <KeepyUppyIcon />
        <KeepyUppyLogo size="sm" />
      </div>
      <SignupLayout>
        {step === 1 && <ToSStepContent />}
        {step === 2 && <EnterUserStepContent />}
        {step === 3 && <CompletionStepContent />}
      </SignupLayout>
      <footer className="fixed bottom-0 flex h-[5.8rem] w-full items-center justify-center bg-gray10">
        <span className="text-body4-bold text-gray50">
          All Rights Reserved ⓒ 2024 Project Team8-Codeit KEEPY UPPY.
        </span>
      </footer>
    </div>
  );
};

export default SignupPage;
