import CompletionStepContent from '@/components/SignupPage/CompletionStepContent';
import EnterUserStepContent from '@/components/SignupPage/EnterUserStepContent';
import SignupLayout from '@/components/SignupPage/SignupLayout';
import ToSStepContent from '@/components/SignupPage/ToSStepContent';
import { StepProvider, useStepContext } from '@/contexts/SignupStepProvider';

function SignupPage() {
  return (
    <StepProvider>
      <SignupLayout>
        <StepContent />
      </SignupLayout>
    </StepProvider>
  );
}

function StepContent() {
  const { step } = useStepContext();

  switch (step) {
    case 1:
      return <ToSStepContent />;
    case 2:
      return <EnterUserStepContent />;
    case 3:
      return <CompletionStepContent />;
    default:
      return null;
  }
}

export default SignupPage;
