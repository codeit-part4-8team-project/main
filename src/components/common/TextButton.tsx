import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

//사이즈 컬러 별로 분기, classname 받아서 부모에서 스타일 추가 가능하도록
//rest 받으므로 form 외부에서 form과 연결할 때는 button attribute인 form={formid} 그대로 전달

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize: 'sm' | 'md' | 'lg';
  color?: 'black' | 'white';
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const TextButton = ({
  buttonSize,
  color = 'black',
  children,
  onClick,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const buttonSizeClasses = clsx({
    'px-[1.8rem] py-[1.2rem] text-[1.2rem] leading-[2.2rem] min-w-[8.7rem]': buttonSize === 'sm',
    'px-[2.4rem] py-[1.2rem] text-[1.2rem] leading-[2.2rem] w-full ': buttonSize === 'md',
    'px-[2.4rem] py-[1.2rem] text-[1.6rem] leading-[2.2rem] w-full ': buttonSize === 'lg',
  });

  const colorClasses = clsx({
    'bg-gray100 text-white': color === 'black',
    'bg-white text-gray100 border-solid border-[0.1rem] border-gray30': color === 'white',
  });

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'disabled:bg-gray30 flex h-[4.6rem] items-center justify-center rounded-[0.6rem] font-bold',
        colorClasses,
        buttonSizeClasses,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;
