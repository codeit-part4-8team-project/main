import { ReactNode, createContext, useContext, useState } from 'react';

type Step = number;

interface StepContextValue {
  step: Step;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  formValidity: boolean;
  setFormValidity: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepContext = createContext<StepContextValue>({
  step: 1,
  setStep: () => {},
  formValidity: false,
  setFormValidity: () => {},
});

export function StepProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>(1);
  const [formValidity, setFormValidity] = useState<boolean>(false);

  return (
    <StepContext.Provider
      value={{
        step,
        setStep,
        formValidity,
        setFormValidity,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useStepContext() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('StepProvider 외부.');
  }

  return context;
}
