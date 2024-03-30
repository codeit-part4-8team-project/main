import { ReactNode } from 'react';
import clsx from 'clsx';

interface NoCardProps {
  type: 'issue' | 'post' | 'announcement-main' | 'announcement-page';
  backgroundColor: string;
  children: ReactNode;
}

export default function NoCard({ type, backgroundColor, children }: NoCardProps) {
  const cardSizeClasses = clsx({
    'min-h-64 w-[28.2rem]': type === 'issue',
    'h-[23.3rem] w-[58rem]': type === 'post',
    'h-64 w-full': type === 'announcement-main',
    'h-[24.8rem] w-[42.6rem]': type === 'announcement-page',
  });

  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-center rounded-[2.4rem] p-[2.4rem]',
        backgroundColor,
        cardSizeClasses,
      )}
    >
      <span className="text-body3-bold text-gray50">{children}</span>
    </div>
  );
}
