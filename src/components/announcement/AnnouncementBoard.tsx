import MegaphoneIcon from '../../../public/assets/megaphone-dark.svg';
import AnnouncementCards from './AnnouncementCards';

export default function AnnouncementBoard() {
  return (
    <div className="row-span-2 mt-[3.6rem] flex w-fit flex-col gap-[2.6rem]">
      <AnnouncememntNotification />
      <AnnouncementCards />
    </div>
  );
}

function AnnouncememntNotification() {
  return (
    <div className="flex gap-4">
      <img src={MegaphoneIcon} alt="메가폰 아이콘" />
      <span className="text-[1.6rem] font-medium">
        새로운 공지사항이 총 <span className="font-extrabold">3</span>건이 있습니다.
      </span>
    </div>
  );
}
