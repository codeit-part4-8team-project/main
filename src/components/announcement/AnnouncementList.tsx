import NoCard from '@/components/common/NoCard';
import AnnouncementItem from '@/components/announcement/AnnouncementItem';

export default function AnnouncementList() {
  const hasCard = true;

  return (
    <div className="flex h-full w-full flex-col gap-[2.4rem] overflow-scroll">
      {hasCard ? (
        <>
          <AnnouncementItem />
          <AnnouncementItem />
          <AnnouncementItem />
          <AnnouncementItem />
          <AnnouncementItem />
        </>
      ) : (
        <NoCard backgroundColor="white">공지사항이 없습니다.</NoCard>
      )}
    </div>
  );
}
