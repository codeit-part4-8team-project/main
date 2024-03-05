import TaskCards from './TaskCards';

function IssueCard() {
  return (
    <div className="flex flex-col gap-[2.4rem] bg-[#F6F6F6] px-[2.3rem] py-[2.8rem]">
      <span className="text-[1.6rem] text-[#A1A1A1]">할 일 1</span>
      <TaskCards />
    </div>
  );
}

export default function IssueCards() {
  return (
    <div className="flex gap-[2.3rem]">
      <IssueCard />
      <IssueCard />
      <IssueCard />
    </div>
  );
}
