import { ChangeEventHandler } from 'react';

interface ModalInputProps {
  placeholder?: string;
  value?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  id: string;
}

function ModalInput({ placeholder, value, className, id }: ModalInputProps) {
  const inputSize = ' px-[1.8rem] py-[1.2rem] ${formTextSize} size-full';
  return (
    <>
      <input
        // defaultValue={}
        className={`${className} ${inputSize}`}
        placeholder={placeholder}
        onChange={value}
        id={id}
      />
    </>
  );
}

export default ModalInput;
