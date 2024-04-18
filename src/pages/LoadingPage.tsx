import GroupIcon from '@/assets/GroupIcon';
import KeepyUppyIcon from '@/assets/KeepyUppyIcon';
import KeepyUppyLogo from '@/assets/KeepyUppyLogo';
import PlusCircleIcon from '@/assets/PlusCircleIcon';
import globalLink from '@/assets/assets/globe-dark.svg';

export default function LoadingPage() {
  return (
    <div className="h-screen w-screen bg-gray20 pb-[2.4rem] pl-[28.4rem] pr-[2.4rem] pt-[8.6rem]">
      <div>
        <div className="z-1 fixed left-0 right-0 top-0 z-50 m-0  flex items-center justify-between bg-gray10">
          <div className="mb-[0.8rem] ml-16 mt-[1.1rem] flex items-center gap-[0.8rem] self-center">
            <KeepyUppyIcon />
            <KeepyUppyLogo size="sm" />
            <div className="relative ml-[17.4rem] flex h-[3.6rem] w-[3.6rem] items-center gap-[0.8rem] rounded-full bg-gray80">
              <img
                className="[0.6rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                src={globalLink}
                alt="글로벌 아이콘"
              />
              <PlusCircleIcon />
            </div>
          </div>
          <div className="relative my-2.5 mr-6 flex items-center gap-8">
            <GroupIcon />
            <div className="peer absolute right-0 top-0 -z-10 h-[5.4rem] w-[3.6rem]"></div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 top-[8.2rem] z-50 w-[26rem] rounded-tr-3xl bg-gray100">
        <div className="my-[3.3rem] ml-16 flex items-center gap-[1.6rem]"></div>
        <div className="relative mt-[120%] flex items-center justify-between bg-black py-[1.8rem] pl-16 pr-[2.4rem]">
          <span className="text-body2-bold text-[#EDEEDC]">그룹</span>
          <PlusCircleIcon fill="#F0F0E2" />
        </div>
      </div>
      <div className="relative h-full w-full flex-1 overflow-auto rounded-[2.4rem] bg-gray10 p-12 shadow-[0px_0px_5px_0px_rgba(17,17,17,0.1)]"></div>
    </div>
  );
}
