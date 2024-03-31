import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import AnnouncementPageList from '@/components/announcement/AnnouncementPageList';
import { usePagenation } from '@/contexts/PageProvider';
import { Announcement } from '@/types/announcementTypes';

export default function TeamAnnouncementsPage() {
  const { dataContent } = usePagenation();

  return (
    <BoardSection title="Notice">
      <div className="flex h-full flex-col items-center justify-between gap-[4.6rem]">
        <AnnouncementPageList announcements={dataContent as Announcement[]} />
        <Pagenation />
      </div>
    </BoardSection>
  );
}
