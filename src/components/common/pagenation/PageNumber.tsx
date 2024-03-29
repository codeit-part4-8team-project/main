import clsx from 'clsx';

interface PageNumberProps {
  isCurrent: boolean;
  children: number;
  onClick: (page: number) => void;
}

export default function PageNumber({ isCurrent, children, onClick }: PageNumberProps) {
  const handleClick = () => onClick(children);
  return (
    <button
      onClick={handleClick}
      className={clsx('text-body2-bold', isCurrent ? 'text-[#6F6963]' : 'text-[#C0BCB6]')}
    >
      {children}
    </button>
  );
}
