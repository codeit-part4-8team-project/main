import { ReactNode } from 'react';

interface ModalInputProps {
  placeholder?: string;
  className?: string;
  id: string;
  type?: string;
  name?: string;
  hookform?: any;
  // hookform?: UseFormRegister<string> | undefined; 타입을 모르것네
  children?: ReactNode;
  defaultValue?: string;
  value?: string;
  onModalDateClick?: (date: string) => void;
}

export default function ModalInput({
  placeholder,
  className,
  id,
  type,
  name,
  hookform,
  children,
  defaultValue,
  value,
}: ModalInputProps) {
  const inputSize = ' px-[1.8rem] py-[1.2rem] w-full';
  return (
    <>
      <div className="relative w-full">
        <input
          defaultValue={defaultValue}
          {...hookform}
          name={name}
          className={`${className} ${inputSize} `}
          placeholder={placeholder}
          id={id}
          type={type}
          value={value}
        />
        {children}
      </div>
    </>
  );
}
