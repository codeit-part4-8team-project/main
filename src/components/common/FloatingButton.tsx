import { Link } from 'react-router-dom';
import PencilIcon from '@/assets/PencilIcon';

interface FloatingButtonProps {
  link: string;
}

export default function FloatingButton({ link }: FloatingButtonProps) {
  return (
    <Link to={link}>
      <button
        type="button"
        className="fixed bottom-[5.3rem] right-[5.3rem] flex h-28 w-28 items-center justify-center rounded-full bg-gray100 shadow-[0_6.769px_16.923px_0_rgba(17,17,17,0.10);]"
      >
        <PencilIcon />
      </button>
    </Link>
  );
}
