import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import calender from '../../../public/assets/calendar-dark.svg';
import profile from '../../../public/profile.svg';
import TextButton from '@/components/common/TextButton';
import ModalCalendar from '@/components/common/modal/ModalCalendar';
import ModalCalendarInput from '@/components/common/modal/ModalCalendarInput';
import ModalFormBorder from '@/components/common/modal/ModalFormBorder';
import ModalInput from '@/components/common/modal/ModalInput';
import ModalLabel from '@/components/common/modal/ModalLabel';
import ModalLayout from '@/components/common/modal/ModalLayout';
import { useAxios } from '@/hooks/useAxios';

interface ScheduleModalProps {
  closeClick?: () => void;
}

type Inputs = {
  title: string;
  startDateTime: string;
  endDateTime: string;
};

function ScheduleModal({ closeClick }: ScheduleModalProps) {
  const { data, error, fetchData } = useAxios({});
  const formTextSize = 'text-body3-medium';
  const inputTextSize = 'text-body3-regular';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-gray30';

  // ui 형식이 약간 다른거같음.
  // 스타트데이트타임 엔드데이트타임 구분 안 되어있고, 타입 없고 컨텐츠 없고, 시간값 없음

  // 'api/schedule/user' 이 api임
  // {
  //   "type": "string", // 얘 없음
  //   "title": "string",
  //   "content": "string", // 얘 없음
  //   "startDateTime": "2024-03-24T09:44:59.469Z", // 시간값 없음
  //   "endDateTime": "2024-03-24T09:44:59.469Z"
  // }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createSchedlue = {
      title: data.title,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
    };
    handleFetchData(createSchedlue);
    console.log('createTema', createSchedlue);
  };
  const startDateToggleRef = useRef<HTMLButtonElement | null>(null);
  const [startDateToggle, setStartDateToggle] = useState(false);

  const handleStartDateClick = () => {
    setStartDateToggle(!startDateToggle);
  };

  const handleStartDateClickOutside = (e: MouseEvent) => {
    if (startDateToggleRef.current && !startDateToggleRef.current.contains(e.target as Node))
      setStartDateToggle(false);
  };
  useEffect(() => {
    if (startDateToggle) {
      document.addEventListener('mousedown', handleStartDateClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleStartDateClickOutside);
    };
  }, [startDateToggle]);

  const handleFetchData = (data: Inputs) => {
    fetchData({
      newPath: 'schedule/user',
      newMethod: 'POST',
      newData: data,
    });
  };

  return (
    <ModalLayout title="일정 추가" closeClick={closeClick} size="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-[35.5rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-gray30 px-12 pt-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자(나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">userNickName</p>
            {/*  */}
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel label="제목" className={`${formTextSize}`} htmlFor="title" />
            <ModalInput
              hookform={register('title')}
              className={`${inputTextSize} ${borderStyle}`}
              placeholder="일정 제목을 입력해 주세요."
              id="title"
              type="text"
              name="title"
            />
          </div>
          {watch('title') ? (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">{watch('title')?.length}/20</p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-gray50">0/20</p>
          )}
          <div className="flex flex-col gap-[0.8rem]">
            {/* <ModalLabel label="날짜" className={`${formTextSize}`} htmlFor="date" /> */}
            {/* ui 형식이 약간 다른거같음. */}
            <ModalCalendarInput
              startHookform={register('startDateTime')}
              startName="startDateTime"
              endHookform={register('endDateTime')}
              endName="endDateTime"
            />
            {/* <ModalInput
              hookform={register('date')}
              className={`${inputTextSize} ${borderStyle}`}
              placeholder="YYYY-MM-DD 형식으로 입력해 주세요."
              name="date"
              id="date"
            >
              <button
                className="absolute bottom-0 right-[1.8rem] top-0"
                onClick={handleStartDateClick}
                ref={startDateToggleRef}
              >
                <img src={calender} alt="캘린더" />
              </button>
              {startDateToggle && (
                <div className="absolute top-20 z-[9999] h-[20.1rem] w-[25.5rem] bg-white px-[1.4rem] py-[1.3rem]">
                  <ModalCalendar />
                </div>
              )}
            </ModalInput> */}
          </div>
        </ModalFormBorder>
        <TextButton buttonSize="md" className="mt-16">
          일정 추가하기
        </TextButton>
      </form>
    </ModalLayout>
  );
}

export default ScheduleModal;
