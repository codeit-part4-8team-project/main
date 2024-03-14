import BoardSection from '@/components/common/BoardSection';
import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function MainPage() {
  return (
    <div className="h-full w-full bg-[#EFEFEF] pb-[4.4rem] pl-[28.4rem] pr-[2.4rem] pt-[8.2rem]">
      <Nav />
      <SideBar />
      <div className="grid h-[113rem] w-[161.2rem] grid-cols-[107.4fr_42.6fr] grid-rows-[auto_auto] gap-[5.2rem] rounded-[2.4rem] bg-[#F7F7F7] p-12 shadow-[0px_0px_5px_0px_rgba(17,17,17,0.1)]">
        <BoardSection title="My calendar" content={<Temp />} />
        <div className="row-span-2">
          <AnnouncementBoard />
        </div>
        <BoardSection title="Kanban board" content={<KanbanBoard />} />
      </div>
    </div>
  );
}

function Temp() {
  return <div className="h-[40.6rem] w-full border border-black"></div>;
}
