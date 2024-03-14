import { ChangeEventHandler } from 'react';

interface ModalInputProps {
  placeholder?: string;
  value?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  id: string;
  type?: string;
  name?: string;
  hookform?: any;
}

function ModalInput({ placeholder, value, className, id, type, name, hookform }: ModalInputProps) {
  const inputSize = ' px-[1.8rem] py-[1.2rem] ${formTextSize} size-full';
  return (
    <>
      <input
        {...hookform}
        name={name}
        // value={...hookform}
        // defaultValue={}
        className={`${className} ${inputSize}`}
        placeholder={placeholder}
        onChange={value}
        id={id}
        type={type}
      />
    </>
  );
}

export default ModalInput;
