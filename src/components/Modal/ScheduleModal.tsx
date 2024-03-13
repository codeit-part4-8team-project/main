import { ChangeEvent, useState } from 'react';
import profile from '../../../public/profile.svg';
import ModalInput from '../ModalAtuom/ModalInput';
import ModalLabel from '../ModalAtuom/ModalLabel';
import ModalLayout from '../common/ModalLayout';

interface ScheduleModalProps {
  closeClick?: () => void;
}

function ScheduleModal({ closeClick }: ScheduleModalProps) {
  const formTextSize = 'text-[1.4rem] font-medium';
  const borderSize = 'rounded-[0.6rem] border-[0.1rem] border-[#E5E5E5]';
  const [scheduleDetail, setScheduleDetail] = useState(''); // hookForm 쓸지 안 쓸지 결정해서 작업하기

  const handlePreventDefault = (e: any) => {
    e.preventDefault();
  };

  const handleScheduleDetailValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('일정내용입력인풋입니다.-필겸-');
    setScheduleDetail(e.target.value);
  };
  return (
    <ModalLayout title="일정 추가" closeClick={closeClick} size="md">
      <form onSubmit={handlePreventDefault}>
        <div className={`mt-16 h-[35.5rem] w-[41.7rem] ${borderSize} px-16 pt-16`}>
          <p className={`${formTextSize} mb-[1.6rem]`}>게시자 (나)</p>
          <div className="mb-16 flex items-center gap-4">
            <img src={profile} alt="profile" />
            {/* 데이터 받아지면 변경 예정구역 */}
            <p className=" text-[1.4rem]">#userNickName</p>
            {/*  */}
          </div>
          <div className=" flex flex-col gap-[0.8rem]">
            <ModalLabel label="제목" className={`${formTextSize}`} htmlFor="schedule" />
            <ModalInput
              placeholder="일정 제목을 입력해 주세요."
              id="schedule"
              className={`${formTextSize} ${borderSize} `}
            />
          </div>
          <p className="mb-12 flex justify-end text-[#A1A1A1]">0/20</p>
          <div className=" flex flex-col gap-[0.8rem]">
            <ModalLabel label="날짜" className={`${formTextSize}`} htmlFor="date" />
            <ModalInput
              placeholder="2024년 3월 13일 (수요일)"
              id="date"
              className={`${formTextSize} ${borderSize} `}
            />
          </div>
        </div>

        <button className="mt-16 h-[4.6rem] w-[41.7rem] rounded-[0.6rem] bg-[#292929] px-[2.4rem] py-5 text-lg text-white">
          그룹 생성하기
        </button>
      </form>
    </ModalLayout>
  );
}

export default ScheduleModal;
