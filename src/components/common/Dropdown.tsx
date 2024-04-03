import { useState } from 'react';
import clsx from 'clsx';
import AllowDownIcon from '@/assets/AllowDownIcon';

interface DropDownProps {
  options: string[];
  selectedOption: string;
  initialOption?: string;
  onSelect: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}
//밸류 받고 위에서 키 찾아 보내는걸로
export default function Dropdown({
  options,
  selectedOption,
  initialOption,
  onSelect,
  className,
  size = 'md',
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const sizeClasses = clsx({ 'px-[10rem]': size === 'sm', 'px-[1.8rem]': size === 'md' });

  return (
    <div
      className={clsx(
        'relative inline-block w-full rounded-[0.6rem] border border-gray30 bg-white text-left',
        className,
        sizeClasses,
      )}
    >
      <button
        type="button"
        className="inline-flex h-full w-full items-center justify-between text-body3-regular focus:outline-none"
        onClick={toggleDropdown}
      >
        <span className={selectedOption || initialOption ? '' : 'text-gray50'}>
          {selectedOption || initialOption || '역할을 선택해주세요'}
        </span>
        <AllowDownIcon />
      </button>

      {isOpen && (
        <ul className="boder-solid absolute left-0 z-10 mt-[0.4rem] block w-full rounded-[0.6rem] border border-gray30 bg-white">
          {options.map((option) => (
            <li
              key={`dropdown-${option}`}
              className={clsx(
                'flex cursor-pointer items-center px-4 py-2 text-body3-regular text-gray100 hover:bg-gray10',
                className,
                sizeClasses,
              )}
              onClick={() => {
                onSelect(option);
                toggleDropdown();
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
