import { useAxios } from '@/hooks/useAxios';
import Circles from '@/assets/Circle';

interface circleType {
  id: number;
  color: string;
}

interface ModalToggleProps {
  handleColorClick: (color: string) => void;
}

function ModalColorToggle({ handleColorClick }: ModalToggleProps) {
  const { data: colorData } = useAxios<string[]>(
    {
      path: 'team/color-palette',
    },
    true,
  );
  console.log(colorData);
  return (
    <>
      <div className="absolute left-0 right-0 top-[6rem] z-50 grid h-[16.2rem] w-[25.4rem] grid-cols-5 gap-[1.6rem] rounded-[0.6rem] bg-white p-8 shadow-[0_0_10px_0_rgba(17,17,17,0.05)]">
        {colorData?.map((circle: string, index: number) => (
          <div
            onClick={() => handleColorClick(circle)}
            className={`h-12  w-12 rounded-[50%] border-[0.2rem] border-black`}
            style={{ backgroundColor: circle }}
            key={index}
          ></div>
        ))}
      </div>
    </>
  );
}

export default ModalColorToggle;
