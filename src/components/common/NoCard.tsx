import { ReactNode } from 'react';

interface NoCardProps {
  children: ReactNode;
  backgroundColor: string;
}

export default function NoCard({ children, backgroundColor }: NoCardProps) {
  return (
    <div
      className={`relative flex h-64 flex-col items-center justify-center rounded-[2.4rem] bg-${backgroundColor} p-[2.4rem]`}
    >
      <span className="text-body3-bold text-gray50">{children}</span>
    </div>
  );
}
