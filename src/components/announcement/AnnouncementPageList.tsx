import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import NoCard from '@/components/common/NoCard';
import TextButton from '@/components/common/TextButton';
import AnnouncementModal from '@/components/Modal/AnnouncementModal';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';
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
        {announcements.length !== 0 ? (
          <ul
            className={clsx(
              'mx-auto grid w-full max-w-[132.6rem] list-none grid-cols-3 gap-[2.4rem]',
            )}
          >
            {announcements.map((announcement) => {
              return (
                <li key={announcement.id}>
                  <AnnouncementItem announcement={announcement} type="page" />
                </li>
              );
            })}
          </ul>
        ) : (
          <NoCard type="announcement-page" backgroundColor="bg-white">
            공지사항이 없습니다.
          </NoCard>
        )}
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
