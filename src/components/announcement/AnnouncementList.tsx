import NoCard from '@/components/common/NoCard';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';
import { Announcement } from '@/types/announcementTypes';
import { Team } from '@/types/teamTypes';
import MegaphoneIcon from '@/assets/MegaphoneIcon';

interface AnnouncementListProps {
  announcements: Announcement[];
  team?: Team;
}

/* 유저/팀의 대시보드 페이지에서 사용하는 공지글 리스트 */
export default function AnnouncementList({ announcements, team }: AnnouncementListProps) {
  return (
    <div className="row-span-2 mt-[3.6rem] flex h-full w-full flex-col gap-[2.6rem]">
      <div className="flex gap-4">
        <MegaphoneIcon />
        <span className="text-body2-regular">
          새로운 공지사항이 총 <span className="font-extrabold">{announcements.length}</span>건이
          있습니다.
        </span>
      </div>
      <div className="h-full w-full overflow-scroll">
        {announcements.length !== 0 ? (
          <ul className="flex list-none flex-col gap-[2.4rem]">
            {announcements.map((announcement) => {
              return (
                <li key={announcement.id}>
                  <AnnouncementItem announcement={announcement} type="main" team={team} />
                </li>
              );
            })}
          </ul>
        ) : (
          <NoCard type="announcement-main" backgroundColor="bg-white">
            공지사항이 없습니다.
          </NoCard>
        )}
      </div>
    </div>
  );
}
