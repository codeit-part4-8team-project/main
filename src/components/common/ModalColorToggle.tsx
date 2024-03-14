import Circles from '@/assets/Circle';

interface circleType {
  id: number;
  color: string;
}

interface ModalToggleProps {
  closeClick?: () => void;
  handleColorClick?: any;
}

function ModalColorToggle({ closeClick, handleColorClick }: ModalToggleProps) {
  return (
    <>
      <div
        className="absolute left-0 right-0 top-[6rem] grid h-[16.2rem] w-[25.4rem] grid-cols-5 gap-[1.6rem] rounded-[0.6rem] border-[0.2rem] border-black bg-white p-8 shadow-2xl"
        onClick={closeClick}
      >
        {Circles.map((circle: circleType) => (
          <div
            onClick={() => handleColorClick(circle?.color)}
            className={`h-12  w-12 rounded-[50%] border-[0.2rem] border-black`}
            style={{ backgroundColor: circle.color }}
            key={circle.id}
          ></div>
        ))}
      </div>
    </>
  );
}

export default ModalColorToggle;
