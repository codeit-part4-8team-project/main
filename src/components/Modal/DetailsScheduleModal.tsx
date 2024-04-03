import calender from '../../../public/assets/calendar-dark.svg';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';
import { Author } from '@/types/commonTypes';

interface DetailScheduleModalProps {
  closeClick: () => void;
  scheduleId: number;
}

interface userType {
  name: string;
  imageUrl: string;
  username: string;
}

interface defaultValue {
  content?: string;
  endDateTime?: string;
  startDateTime?: string;
  title?: string;
  author?: Author;
  user?: userType;
}
// 합칠때 에러 떠서 일단 기본값
export default function DetailScheduleModal({
  closeClick,
  scheduleId = 1,
}: DetailScheduleModalProps) {
  const { data: defaultValue } = useAxios(
    {
      path: `schedule/${scheduleId}`,
    },
    true,
  );

  const { content, endDateTime, startDateTime, title, author, user }: defaultValue =
    defaultValue || {};

  const TextSize = 'text-body3-medium';
  const divTextSize = 'text-body3-regular';
  const borderStyle =
    'rounded-[0.6rem] border-[0.1rem] border-gray30  px-[1.8rem] py-[1.2rem] w-full';

  return (
    <ModalLayout closeClick={closeClick} title="일정">
      <ModalFormBorder className="mt-16 h-full w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 p-12">
        <p className={`${TextSize} mb-[1.6rem]`}>게시자 (나)</p>
        <div className="mb-16 flex items-center gap-4">
          {user && (
            <>
              <img
                src={user?.imageUrl}
                alt="profile"
                className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
              />
              <p className=" text-[1.4rem]">{user?.username}</p>
            </>
          )}
          {author && (
            <>
              <img
                src={author?.imageUrl}
                alt="profile"
                className="h-[2.4rem] w-[2.4rem] rounded-[999rem]"
              />
              <p className=" text-[1.4rem]">{author?.username}</p>
            </>
          )}
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
