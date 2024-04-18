import { ReactNode } from 'react';

interface OthersMessageItemProps {
  children: ReactNode;
}

export default function OthersMessageItem({ children }: OthersMessageItemProps) {
  return (
    <div className="flex flex-col items-start gap-[0.9rem]">
      <div className="h-[3.5rem] max-w-[24rem] rounded-[0.6rem] rounded-bl-none bg-gray10 px-6 py-[0.8rem] text-body3-regular text-gray100">
        {children}
      </div>
      <span className="text-body4-regular text-gray50">PM 04:23</span>
    </div>
  );
}
