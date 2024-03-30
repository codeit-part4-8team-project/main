import BoardSection from '@/components/common/BoardSection';
import Pagenation from '@/components/common/pagenation/Pagenation';
import AnnouncementPageList from '@/components/announcement/AnnouncementPageList';
import { usePagenation } from '@/contexts/PageProvider';
import { Announcement } from '@/types/announcementTypes';

export default function TeamAnnouncementsPage() {
  const { dataContent } = usePagenation();

  // console.log('dataContent', dataContent);

  return (
    <BoardSection title="Notice">
      <div className="flex flex-col items-center gap-[4.6rem]">
        <AnnouncementPageList announcements={dataContent as Announcement[]} />
        <Pagenation />
      </div>
    </BoardSection>
  );
}
