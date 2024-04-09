import { InputHTMLAttributes } from 'react';
import { Control, UseFormRegisterReturn, useWatch } from 'react-hook-form';
import CheckCircleIcon from '@/assets/CheckCircleFill';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  register?: UseFormRegisterReturn;
  control: Control;
}

function CheckboxInput({ id, register, control }: CheckboxInputProps) {
  const checked = useWatch({
    control: control,
    name: id, // 관찰하고자 하는 필드 이름
    defaultValue: false, // 기본값
  });
  return (
    <>
      <label htmlFor={id} className="flex place-items-center">
        <CheckCircleIcon active={checked}></CheckCircleIcon>
        <input id={id} {...register} type="checkbox" className="appearance-none"></input>
      </label>
    </>
  );
}

export default CheckboxInput;
