import { ReactNode, createContext, useContext, useState } from 'react';

type Step = number;

interface StepContextValue {
  step: Step;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

const StepContext = createContext<StepContextValue>({
  step: 1,
  setStep: () => {},
});

export function StepProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>(1);

  return (
    <StepContext.Provider
      value={{
        step,
        setStep,
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
