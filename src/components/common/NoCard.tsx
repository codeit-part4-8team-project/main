import { ReactNode } from 'react';
import clsx from 'clsx';

interface NoCardProps {
  type: 'issue' | 'post' | 'announcement-main' | 'announcement-page';
  backgroundColor: string;
  children: ReactNode;
}

export default function NoCard({ type, backgroundColor, children }: NoCardProps) {
  const cardSizeClasses = clsx({
    'h-[23.3rem] w-[58rem]': type === 'post' || type === 'announcement-page',
    'h-[16rem] w-full': type === 'announcement-main' || type === 'issue',
  });

  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-center rounded-[2.4rem]',
        backgroundColor,
        cardSizeClasses,
      )}
    >
      <span className="text-body3-bold text-gray50">{children}</span>
    </div>
  );
}
