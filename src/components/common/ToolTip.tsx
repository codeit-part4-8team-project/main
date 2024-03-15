import TipArrow from '../../../public/assets/tooltip-arrow.svg';

export default function ToolTip() {
  return (
    <div className="z-50 flex flex-col items-center">
      <div className="h-[3.7rem] w-[16.4rem]  rounded-[0.6rem] bg-point_yellow p-4">
        <span className="text-body3-bold tracking-[-0.02rem] text-gray100">그룹을 생성하세요!</span>
      </div>
      <img className="mt-[-0.15rem] h-[0.75rem] w-[1.35rem]" src={TipArrow} alt="툴팁 화살표" />
    </div>
  );
}
