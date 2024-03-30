import calender from '../../../public/assets/calendar-dark.svg';
import profile from '../../../public/profile.svg';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';

interface DetailScheduleModalProps {
  closeClick: () => void;
}

interface defaultValue {
  content?: string;
  endDateTime?: string;
  startDateTime?: string;
  title?: string;
  author?: authorType;
}

interface authorType {
  name: string;
  imageUrl: string;
  role: string | null;
  grade: string;
  userName: string;
  createDate: string;
}
// "name": "필겸",
// "imageUrl": "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640",
// "role": null,
// "grade": "OWNER",
// "username": "user-PUESAx6JqD",
// "createdDate": "2024-03-29"
export default function DetailScheduleModal({ closeClick }: DetailScheduleModalProps) {
  // id = 9은 TEAM type
  //   content: "내용"
  // endDateTime: "2024-03-22 00:00:00"
  // id: 3
  // startDateTime: "2024-03-12 00:00:00"
  // title: "제목"

  // id = 10는 USER type
  //content: "user 내용"
  // endDateTime: "2024-03-22 00:00:00"
  // id: 2
  // startDateTime: "2024-03-12 00:00:00"
  // title: "user 제목"
  const scheduleId = 8;
  const { data: defaultValue } = useAxios(
    {
      path: `schedule/${scheduleId}`,
    },
    true,
  );
  const { content, endDateTime, startDateTime, title, author }: defaultValue = defaultValue || {};
  console.log('data', defaultValue);
  const TextSize = 'text-body3-medium';
  const divTextSize = 'text-body3-regular';
  const borderStyle =
    'rounded-[0.6rem] border-[0.1rem] border-gray30  px-[1.8rem] py-[1.2rem] w-full';
  return (
    <ModalLayout closeClick={closeClick} title="일정">
      <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
        <p className={`${TextSize} mb-[1.6rem]`}>게시자 (나)</p>
        <div className="mb-16 flex items-center gap-4">
          <img
            src={author?.imageUrl}
            alt="profile"
            className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
          />
          {/* 데이터 받아지면 변경 예정구역 */}
          <p className=" text-[1.4rem]">{author?.name}</p>
          {/*  */}
        </div>

        <p className={`${TextSize} mb-[0.8rem]`}>제목</p>
        <div className={`${divTextSize} ${borderStyle} mb-[3.8rem]`}>{title}</div>
        <p className={`${TextSize} mb-[0.8rem]`}>내용</p>
        <div className={`${divTextSize} ${borderStyle} mb-[3.8rem]`}>{content}</div>
        <p className={`${TextSize} mb-[0.8rem] mt-12`}>날짜 시작</p>
        <div className={`${divTextSize} ${borderStyle} mb-[3.8rem] flex items-center gap-4`}>
          <p className="w-full">{startDateTime}</p>
          <img src={calender} alt="calender" />
        </div>
        <p className={`${TextSize} mb-[0.8rem] mt-12`}>날짜 종료</p>
        <div className={`${divTextSize} ${borderStyle} flex items-center gap-4`}>
          <p className="w-full">{endDateTime}</p>
          <img src={calender} alt="calender" />
        </div>
      </ModalFormBorder>
    </ModalLayout>
  );
}
