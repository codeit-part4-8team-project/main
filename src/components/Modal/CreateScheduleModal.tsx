import { ChangeEvent, useState } from 'react';
import Mock from '../../../public/data/Mock.json';
import profile from '../../../public/profile.svg';
import ModalInput from '../common/ModalInput';
import ModalLayout from '../common/ModalLayout';

function CreateScheduleModal() {
  const [scheduleDetail, setScheduleDetail] = useState('');
  const { userData } = Mock; // userMockData
  const [{ userId, profileImg, nickName, birth }] = userData; // userMockData

  const handleScheduleDetailValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('일정내용입력인풋입니다.-필겸-');
    setScheduleDetail(e.target.value);
  };
  return (
    <ModalLayout title="일정 생성" buttonText="일정 생성">
      <div className="mb-24 flex items-center gap-7 text-[1.4rem]">
        {profileImg === 'null' ? <img src={profile} alt="profile" /> : <div>해당 이미지</div>}
        {nickName}
      </div>
      <div className="mb-[2.8rem] text-[2rem]">날짜</div>
      <ModalInput placeholder="defaultValues,toggleImg들어가야함">
        <img />
      </ModalInput>
      <div className="mb-[15.8rem] mt-[6.5rem]">
        <ModalInput
          placeholder="일정 내용을 입력하세요"
          value={(e) => handleScheduleDetailValue(e)}
        />
      </div>
    </ModalLayout>
  );
}

export default CreateScheduleModal;
