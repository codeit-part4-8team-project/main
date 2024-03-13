import { InputHTMLAttributes } from 'react';

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

function CheckboxInput({ id }: CheckboxInputProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="h-9 w-9 before:block before:h-[2.4rem] before:w-[2.4rem]
        before:bg-[url('/public/assets/check-circle-fill-light.svg')]
        has-[:checked]:before:bg-[url('/public/assets/check-circle-fill-dark.svg')]"
      >
        <input id={id} type="checkbox" className="appearance-none"></input>
      </label>
    </>
  );
}

export default CheckboxInput;
