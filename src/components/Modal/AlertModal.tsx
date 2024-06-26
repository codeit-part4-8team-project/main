import { ReactNode } from 'react';
import TextButton from '../common/TextButton';

export default function AlertModal({
  children,
  buttonText,
  buttonClick,
}: {
  children: ReactNode;
  buttonText: string;
  buttonClick: () => void;
}) {
  return (
    <div className="h-[250px] w-[540px] p-7 sm:h-[220px] sm:w-[327px]">
      <span className="text-lg sm:text-base mt-[80px] flex justify-center font-medium sm:mt-[53px]">
        {children}
      </span>
      <div className="mt-8 flex justify-end sm:mt-9 sm:justify-center">
        <TextButton buttonSize="md" color="black" onClick={buttonClick} className="text-white">
          {buttonText}
        </TextButton>
      </div>
    </div>
  );
}
