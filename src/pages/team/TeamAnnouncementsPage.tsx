import BoardSection from '@/components/common/BoardSection';
import AnnouncementPageList from '@/components/announcement/AnnouncementPageList';
import { useAnnouncementPage } from '@/hooks/useAnnouncement';

export default function TeamAnnouncementsPage() {
  const { announcementPageData } = useAnnouncementPage();

  return (
    <BoardSection
      title="Notice"
      content={<AnnouncementPageList announcements={announcementPageData} />}
    />
  );
}
