import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

export default function Input({
  id,
  name,
  label,
  placeholder,
  className,
  register,
  children,
  ...props
}: InputProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[0.8rem]">
      {label && (
        <label htmlFor={id} className="text-body3-medium text-[#000000]">
          {label}
        </label>
      )}
      <div className="flex h-[4.6rem] w-full flex-col">
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          {...register}
          className={clsx(
            'w-full items-center rounded-[0.6rem] border-[0.1rem] border-solid border-gray30 px-[1.8rem] py-[1.2rem] text-body3-regular text-gray100 placeholder:text-[#D2D2D]',
            className,
          )}
          {...props}
        />
        {children}
      </div>
    </div>
  );
}

interface InputValidateMessageProps {
  isError?: boolean | string | undefined;
  errorMessage?: string;
  watchMessage?: string;
  isValid?: boolean;
  validMessage?: string;
}
export function InputValidateMessage({
  isError,
  errorMessage,
  watchMessage,
  isValid,
  validMessage,
}: InputValidateMessageProps) {
  return (
    <div className="flex justify-between text-body5-regular leading-[2.2rem]">
      {isError && !isValid ? (
        <span className=" text-point_red">{errorMessage}</span>
      ) : (
        isValid || <span></span>
      )}
      {isValid && <span className="text-[#8DDF90]">{validMessage}</span>}
      <span className="self-end  text-gray50">{watchMessage}</span>
    </div>
  );
}
