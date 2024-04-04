import LandingImg from '../../../public/assets/b092b2f4d5e614fd0d65600fb2b5ce08 1.png';

interface SectionItemProps {
  check: string;
  textup: string;
  textBottom: string;
}
export default function SectionItem({ check, textup, textBottom }: SectionItemProps) {
  return (
    <div className="flex justify-between gap-[3rem] px-24 pt-[10.3rem]">
      <div className="flex flex-col gap-[10rem]">
        <p className="text-[3rem] text-gray50">{check}</p>
        <p className="text-[4.5rem]">
          {textup}
          <br /> {textBottom}
        </p>
      </div>
      <div>
        {/* 여기 해당하는 이미지 넣기 */}
        <img src={LandingImg} className="h-[49rem] w-[59rem]" />
      </div>
    </div>
  );
}
