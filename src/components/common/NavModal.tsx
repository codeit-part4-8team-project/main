import { ReactNode, useState } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  // onClick: () => void;
}

const NavModal: React.FC<ModalProps> = ({ onClose, children }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };
  const handleConfirm = () => {
    return clicked ? 'w-[0.5rem] h-[0.5rem] bg-point-red rounded-full' : '';
  };

  return (
    <div className="modal absolute bottom-0 left-[-28.5rem] right-0 top-[9.7rem] z-50 flex flex-col justify-center">
      <div className="modal-content relative h-36 w-[38.4rem] rounded-lg bg-point_red">
        <div onClick={handleClick} className={handleConfirm()}></div>
        {children}
        <span className="close absolute right-2 top-2 cursor-pointer" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default NavModal;
