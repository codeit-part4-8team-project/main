import AnnouncementCards from './AnnouncementCards';

export default function AnnouncementBoard() {
  return (
    <div className="flex h-[110.7rem] w-fit flex-col gap-[1rem] border-[0.1rem] border-[#DCDCDC] bg-white p-[2.4rem]">
      <div className="flex justify-between">
        <span className="text-[1.6rem]">팀 공지사항</span>
        <button className="bg-[#989898] p-[1rem] text-[1.4rem] text-white">+ 게시</button>
        {/* 공통 컴포넌트로 교체 예정 */}
      </div>
      <div className="h-full">
        <AnnouncementCards />
      </div>
    </div>
  );
}
