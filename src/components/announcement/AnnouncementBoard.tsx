import checkIcon from '../../../public/check.svg';
import AnnouncementCards from './AnnouncementCards';

export default function AnnouncementBoard() {
  return (
    <div className="flex h-[110.7rem] w-fit flex-col gap-[2.6rem]">
      <AnnouncememntNotification />
      <div className="h-full">
        <AnnouncementCards />
      </div>
    </div>
  );
}

function AnnouncememntNotification() {
  return (
    <div className="flex gap-4">
      <img src={checkIcon} alt="메가폰 아이콘" />
      <span className="text-[1.6rem] font-medium">
        새로운 공지사항이 총 <span className="font-extrabold">3</span>건이 있습니다.
      </span>
    </div>
  );
}
