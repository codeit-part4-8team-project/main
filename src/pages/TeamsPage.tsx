import Nav from '@/components/common/Nav';
import SideBar from '@/components/common/sideBar/SideBar';
import TeamBar from '@/components/TeamBar';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';
import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';

export default function TeamsPage() {
  return (
    <div className="relative ml-[26rem] mt-[4.3rem]">
      <Nav />
      <SideBar />
      <TeamBar />
      <div className="h-[28.4rem] w-full bg-[#E4E4E4]"></div>
      <div className="mx-auto mt-[-3.2rem] flex w-fit gap-[2.4rem]">
        <KanbanBoard />
        <AnnouncementBoard />
      </div>
    </div>
  );
}
