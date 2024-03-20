import { ChangeEventHandler, ReactNode } from 'react';

interface ModalInputProps {
  placeholder?: string;
  value?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  id: string;
  type?: string;
  name?: string;
  hookform?: any;
  children?: ReactNode;
}

export default function ModalInput({
  placeholder,
  className,
  id,
  type,
  name,
  hookform,
  children,
}: ModalInputProps) {
  const inputSize = ' px-[1.8rem] py-[1.2rem] ${formTextSize} w-full';
  return (
    <>
      <div className="relative w-full">
        <input
          {...hookform}
          name={name}
          className={`${className} ${inputSize} `}
          placeholder={placeholder}
          id={id}
          type={type}
        />
        {children}
      </div>
    </>
  );
}
