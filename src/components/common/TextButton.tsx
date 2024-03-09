import { ReactNode } from 'react';
import clsx from 'clsx';

//사이즈 컬러 별로 분기, classname 받아서 부모에서 스타일 추가 가능하도록
//rest 받으므로 form 외부에서 form과 연결할 때는 button attribute인 form={formid} 그대로 전달

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  buttonSize?: 'sm' | 'md' | 'lg';
  textSize?: 'sm' | 'md' | 'lg';
  color: 'black';
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const TextButton = ({
  type = 'button',
  buttonSize = 'md',
  textSize = 'md',
  color,
  children,
  onClick,
  disabled = false,
  className,
  ...rest
}: ButtonProps) => {
  const buttonSizeClasses = clsx({
    'px-[29.5px] py-[7.5px] md:px-[23.5px] md:py-[6.5px] sm:px-[44px] sm:py-[7px]':
      buttonSize === 'sm',
    'px-[46px] py-[14.5px]  sm:px-[56px] sm:py-[12.5px]': buttonSize === 'md',
    'py-[20.5px] px-[95.5px] sm:px-[84.5px] sm:py-[16.5px]': buttonSize === 'lg',
  });

  const textSizeClasses = clsx({
    'text-md sm:text-xs': textSize === 'sm',
    'text-sm font-bold ': textSize === 'md',
    'text-lg': textSize === 'lg',
  });

  const colorClasses = clsx({
    'rounded-md bg-[#292929]': color === 'black',
  });

  return (
    <button
      type={type}
      className={clsx(textSizeClasses, colorClasses, buttonSizeClasses, className, 'font-medium')}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default TextButton;
