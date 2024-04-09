import TipArrow from '@/assets/TipArrow';

export default function ToolTip() {
  return (
    <div className="absolute -left-[7.4rem] -top-[5.1rem] z-50 flex flex-col items-center">
      <div className="flex h-[3.7rem] w-[16.4rem] items-center justify-center rounded-[0.6rem] bg-point_yellow p-4">
        <span className="text-body3-bold tracking-[-0.02rem] text-gray100">그룹을 생성하세요!</span>
      </div>
      <TipArrow className="mt-[-0.15rem] h-[0.75rem] w-[1.35rem]" />
    </div>
  );
}
