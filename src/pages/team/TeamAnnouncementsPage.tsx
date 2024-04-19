import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import AnnouncementPageList from '@/components/announcement/AnnouncementPageList';
import { usePagenation } from '@/contexts/PageProvider';
import { Announcement } from '@/types/announcementTypes';

export default function TeamAnnouncementsPage() {
  const { dataContent, refetch } = usePagenation();

  const reloadAnnouncements = () => {
    refetch();
  };

  return (
    <BoardSection title="Notice">
      <div className="mx-auto flex h-full max-w-[119rem] flex-col items-center justify-between gap-[4.6rem]">
        <AnnouncementPageList
          announcements={dataContent as Announcement[]}
          reloadAnnouncements={reloadAnnouncements}
        />
        <Pagenation />
      </div>
    </BoardSection>
  );
}
