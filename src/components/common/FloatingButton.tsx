import { useState } from 'react';
import FreeBoardModal from '@/components/Modal/FreeBoardModal';
import PencilIcon from '@/assets/PencilIcon';

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && <FreeBoardModal closeClick={handleToggleModalClick} />}
      <button
        type="button"
        className="fixed bottom-[5.3rem] right-[5.3rem] flex h-28 w-28 items-center justify-center rounded-full bg-gray100 shadow-[0_6.769px_16.923px_0_rgba(17,17,17,0.10);]"
      >
        <PencilIcon />
      </button>
    </>
  );
}
