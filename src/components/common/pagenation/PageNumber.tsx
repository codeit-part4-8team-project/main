import clsx from 'clsx';
import { usePagenation } from '@/contexts/PageProvider';

interface PageNumberProps {
  isCurrent: boolean;
  children: number;
}

export default function PageNumber({ isCurrent, children }: PageNumberProps) {
  const { setCurrentPage } = usePagenation();
  const handleClick = () => setCurrentPage(children);

  return (
    <button
      onClick={handleClick}
      className={clsx('text-body2-bold', isCurrent ? 'text-[#6F6963]' : 'text-[#C0BCB6]')}
    >
      {children}
    </button>
  );
}
