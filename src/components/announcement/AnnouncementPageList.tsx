import NoCard from '@/components/common/NoCard';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';
import { Announcements } from '@/types/announcementTypes';

interface AnnouncementPageListProps {
  announcements: Announcements;
}

/* 팀의 공지사항 페이지에서 사용하는 공지글 리스트 */
export default function AnnouncementPageList({
  announcements: { content },
}: AnnouncementPageListProps) {
  return (
    <div className="w-[132.6rem]">
      {content.length !== 0 ? (
        <li className="grid w-fit list-none grid-cols-3 gap-[2.4rem]">
          {content.map((announcement) => {
            return (
              <ul>
                <AnnouncementItem announcement={announcement} />
              </ul>
            );
          })}
        </li>
      ) : (
        <NoCard backgroundColor="bg-white">공지사항이 없습니다.</NoCard>
      )}
    </div>
  );
}
