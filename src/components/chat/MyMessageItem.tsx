import { ReactNode } from 'react';

interface MyMessageItemProps {
  children: ReactNode;
}

export default function MyMessageItem({ children }: MyMessageItemProps) {
  return (
    <div className="flex flex-col items-end gap-[0.9rem]">
      <div className="h-[3.5rem] max-w-[24rem] rounded-[0.6rem] rounded-br-none bg-[#7187FE] px-6 py-[0.8rem] text-body3-regular text-white">
        {children}
      </div>
      <span className="text-body4-regular text-gray50">PM 04:23</span>
    </div>
  );
}
