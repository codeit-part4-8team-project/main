import { ChangeEventHandler, ReactNode } from 'react';

interface ModalInputProps {
  placeholder: string;
  children?: ReactNode;
  value?: ChangeEventHandler<HTMLInputElement>;
}

function ModalInput({ placeholder, children, value }: ModalInputProps) {
  const placeholderName = 'w-[53.6rem] border-b-[0.1rem] border-solid border-black';
  return (
    <>
      <div className="flex">
        {children}
        <input
          className={`${placeholder === '검색' ? `${placeholderName} pb-[0.5rem] text-2xl` : `${placeholderName} text-[4rem]`}`}
          placeholder={placeholder}
          onChange={value}
        />
      </div>
    </>
  );
}

export default ModalInput;
