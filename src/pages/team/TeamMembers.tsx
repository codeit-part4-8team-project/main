import BoardSection from '@/components/common/BoardSection';
import AnnouncementBoard from '@/components/announcement/AnnouncementBoard';

export default function TeamMembers() {
  return <BoardSection title="Notice" content={<AnnouncementBoard />} />;
}
