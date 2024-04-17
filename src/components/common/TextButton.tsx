import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

//사이즈 컬러 별로 분기, classname 받아서 부모에서 스타일 추가 가능하도록
//rest 받으므로 form 외부에서 form과 연결할 때는 button attribute인 form={formid} 그대로 전달

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize: 'sm' | 'md' | 'lg';
  color?: 'black' | 'white' | 'red' | 'yellow' | 'blue' | 'gray';
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>; //빌드 오류나서 일단 바꿔놓음
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
    'px-[1.8rem] py-[1.2rem] text-body4-bold leading-[2.2rem] min-w-[8.7rem]': buttonSize === 'sm',
    'px-[2.4rem] py-[1.2rem] text-body4-bold leading-[2.2rem] w-full ': buttonSize === 'md',
    'px-[2.4rem] py-[1.2rem] text-[1.6rem] leading-[2.2rem] w-full ': buttonSize === 'lg',
  });

  const colorClasses = clsx({
    'bg-gray100 text-white': color === 'black',
    'bg-white text-gray100 border-solid border-[0.1rem] border-gray30': color === 'white',
    'bg-white text-point_red border-solid border-[0.1rem] border-point_red': color === 'red',
    'bg-point_yellow text-[#000000] border-solid border-[0.1rem] border-point_yellow':
      color === 'yellow',
    'bg-[#292A2D]  text-[#9AB4F2]': color === 'blue',
    'bg-[#9AB4F2]  text-[#292A2D]': color === 'gray',
  });

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex max-h-[4.6rem] items-center justify-center rounded-[0.6rem] font-bold disabled:bg-gray30',
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
