import BoardSection from '@/components/common/BoardSection';
import AnnouncementPageList from '@/components/announcement/AnnouncementPageList';
import useAnnouncement from '@/hooks/useAnnouncement';

export default function TeamAnnouncementsPage() {
  const { announcementPageData } = useAnnouncement();

  return (
    <BoardSection
      title="Notice"
      content={<AnnouncementPageList announcements={announcementPageData} />}
    />
  );
}