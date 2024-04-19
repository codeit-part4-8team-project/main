import { useParams } from 'react-router-dom';
import NoCard from '@/components/common/NoCard';
import TextButton from '@/components/common/TextButton';
import AnnouncementModal from '@/components/Modal/AnnouncementModal';
import AnnouncementPageItem from '@/components/announcement/AnnouncementPageItem';
import { useModal } from '@/contexts/ModalProvider';
import { Announcement } from '@/types/announcementTypes';

interface AnnouncementPageListProps {
  announcements: Announcement[] | [];
  reloadAnnouncements: () => void;
}

/* 팀의 공지사항 페이지에서 사용하는 공지글 리스트 */
export default function AnnouncementPageList({
  announcements,
  reloadAnnouncements,
}: AnnouncementPageListProps) {
  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => (
      <AnnouncementModal
        reloadAnnouncements={reloadAnnouncements}
        closeClick={close}
        teamId={Number(teamId)}
      />
    ));
  };

  return (
    <>
      <div className="w-full">
        <ul className="mt-[1.4rem] grid w-full grid-cols-2 gap-12">
          {announcements.length !== 0 ? (
            announcements.map((announcement) => {
              return (
                <li key={announcement.id} className="w-full">
                  <AnnouncementPageItem announcement={announcement} />
                </li>
              );
            })
          ) : (
            <NoCard type="announcement-page" backgroundColor="bg-white">
              게시글이 없습니다.
            </NoCard>
          )}
        </ul>
      </div>
      <TextButton
        buttonSize="sm"
        onClick={handleModalClick}
        className="absolute right-12 top-[3.6rem]"
      >
        게시하기
      </TextButton>
    </>
  );
}
