import { useParams } from 'react-router-dom';
import NoCard from '@/components/common/NoCard';
import TextButton from '@/components/common/TextButton';
import AnnouncementModal from '@/components/Modal/AnnouncementModal';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';
import { useModal } from '@/contexts/ModalProvider';
import { useTeam } from '@/contexts/TeamProvider';
import { Announcement } from '@/types/announcementTypes';

interface AnnouncementPageListProps {
  announcements: Announcement[] | [];
}

/* 팀의 공지사항 페이지에서 사용하는 공지글 리스트 */
export default function AnnouncementPageList({ announcements }: AnnouncementPageListProps) {
  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => <AnnouncementModal closeClick={close} />);
  };

  const { teamId } = useParams();

  if (!teamId) throw Error('해당 팀 ID가 존재하지 않습니다.');

  const { team } = useTeam(teamId);

  return (
    <>
      <div className="w-[132.6rem]">
        {announcements.length !== 0 ? (
          <ul className="grid w-fit list-none grid-cols-3 gap-[2.4rem]">
            {announcements.map((announcement) => {
              return (
                <li key={announcement.id}>
                  <AnnouncementItem announcement={announcement} type="page" team={team} />
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
