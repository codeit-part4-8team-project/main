import Mock from '../../../public/data/Mock.json';
import profile from '../../../public/profile.svg';
import ModalLayout from '../common/ModalLayout';

function CreateScheduleModal() {
  const { userData } = Mock; // userMockData
  const [{ userId, profileImg, nickName, birth }] = userData; // userMockData
  return (
    <ModalLayout title="일정 생성" buttonText="일정 생성">
      <div className="mb-24 flex items-center gap-7 text-[1.4rem]">
        {profileImg === 'null' ? <img src={profile} alt="profile" /> : <div>해당 이미지</div>}
        {nickName}
      </div>
      <div className="text-[2rem]">날짜</div>
    </ModalLayout>
  );
}

export default CreateScheduleModal;
