import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import calender from '../../../public/assets/calendar-dark.svg';
import profile from '../../../public/profile.svg';
import ModalCalendar from '../common/modal/ModalCalendar';
import ModalFormBorder from '../common/modal/ModalFormBorder';
import ModalInput from '../common/modal/ModalInput';
import ModalLabel from '../common/modal/ModalLabel';
import ModalLayout from '../common/modal/ModalLayout';

interface ScheduleModalProps {
  closeClick?: () => void;
}

type Inputs = {
  name: string;
  date: string;
};

function ScheduleModal({ closeClick }: ScheduleModalProps) {
  const formTextSize = 'text-[1.4rem] font-medium';
  const borderStyle = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createTeam = {
      name: data.name,
      date: data.date,
    };
    console.log('createTema', createTeam);
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

  return (
    <ModalLayout title="일정 추가" closeClick={closeClick} size="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalFormBorder className="mt-16 h-[35.5rem] w-[41.7rem] rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5] px-12 pt-12">
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자(나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">userNickName</p>
            {/*  */}
          </div>
          <div className=" mb-[0.8rem] flex flex-col gap-[0.8rem]">
            <ModalLabel label="제목" className={`${formTextSize}`} htmlFor="name" />
            <ModalInput
              hookform={register('name')}
              className={`${formTextSize} ${borderStyle}`}
              placeholder="일정 제목을 입력해 주세요."
              id="name"
              type="text"
              name="name"
            />
          </div>
          {watch('name') ? (
            <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">
              {watch('name')?.length}/20
            </p>
          ) : (
            <p className=" mb-[0.9rem] flex justify-end text-[#A1A1A1]">0/20</p>
          )}
          <div className="flex flex-col gap-[0.8rem]">
            <ModalLabel label="날짜" className={`${formTextSize}`} htmlFor="date" />
            <ModalInput
              hookform={register('date')}
              className={`${formTextSize} ${borderStyle}`}
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
            </ModalInput>
          </div>
        </ModalFormBorder>
        {/* <button></button> 채빈님 버튼 넣기 */}
      </form>
    </ModalLayout>
  );
}

export default ScheduleModal;
