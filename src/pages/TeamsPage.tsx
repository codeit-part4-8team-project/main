import TeamBar from '@/components/TeamBar';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';
import KanbanBoard from '@/components/issue/KanbanBoard';

const TeamsPage = () => {
  return (
    <div>
      <TeamBar />
      <div className="h-[28.4rem] w-full bg-[#E4E4E4]"></div>
      <div className="mx-auto mt-[-3.2rem] flex w-fit gap-[2.4rem]">
        <KanbanBoard />
        <AnnouncementBoard />
      </div>
    </div>
  );
};

export default TeamsPage;
