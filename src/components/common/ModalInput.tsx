import { ChangeEventHandler, ReactNode } from 'react';

interface ModalInputProps {
  placeholder?: string;
  children?: ReactNode;
  value?: ChangeEventHandler<HTMLInputElement>;
}

function ModalInput({ placeholder, children, value }: ModalInputProps) {
  const placeholderName = ' border-b-[0.1rem] border-solid border-black';
  return (
    <>
      <div className="flex">
        {children}
        <input
          // defaultValue={}
          className={`${placeholder === '검색' ? `${placeholderName} w-[53.6rem] pb-[0.5rem] text-2xl` : `${placeholderName} w-[53.6rem] text-[4rem]`}${placeholder === '일정 내용을 입력하세요' ? `${placeholderName} w-[119rem] text-[4rem]` : `${placeholderName} w-[53.6rem] text-[4rem]`}`}
          placeholder={placeholder}
          onChange={value}
        />
      </div>
    </>
  );
}

export default ModalInput;
