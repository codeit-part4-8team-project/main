import MegaphoneIcon from '../../../public/assets/megaphone-dark.svg';
import AnnouncementList from '@/components/announcement/AnnouncementList';

export default function AnnouncementBoard() {
  return (
    <div className="row-span-2 mt-[3.6rem] flex h-full w-full flex-col gap-[2.6rem]">
      <AnnouncememntNotification />
      <AnnouncementList />
    </div>
  );
}

function AnnouncememntNotification() {
  return (
    <div className="flex gap-4">
      <img src={MegaphoneIcon} alt="메가폰 아이콘" />
      <span className="text-body2-regular">
        새로운 공지사항이 총 <span className="font-extrabold">3</span>건이 있습니다.
      </span>
    </div>
  );
}
