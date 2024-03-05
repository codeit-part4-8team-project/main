import IssueCards from './IssueCards';

export default function KanbanBoard() {
  return (
    <div className="flex h-[110.7rem] w-[113.2rem] flex-col gap-[1rem] border-[0.1rem] border-[#DCDCDC] bg-white p-[2.4rem]">
      <div className="flex justify-between">
        <span className="text-[1.6rem]">칸반보드</span>
        <button className="bg-[#989898] p-[1rem] text-[1.4rem] text-white">+ 이슈 생성</button>
        {/* 공통 컴포넌트로 교체 예정 */}
      </div>
      <div className="h-full">
        <IssueCards />
      </div>
    </div>
  );
}
