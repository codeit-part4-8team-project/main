import Mock from '../../../public/data/Mock.json';
import TeamMembers from '../../../public/data/TeamsMember.json';
import EllipseColor from '../../../public/images/EllipseColor.svg';
import dropDown from '../../../public/images/dorpdown.svg';
import profile from '../../../public/profile.svg';
import ModalInput from '../common/ModalInput';
import ModalLayout from '../common/ModalLayout';

function GroupPutModal() {
  const { members } = TeamMembers; // mock team data
  console.log(members); // mock team data
  const { userData } = Mock; // mock user data
  const [{ userId, profileImg, nickName, birth }] = userData; // mock user data
  const handleExileMember = () => {
    console.log('추방버튼에 onClick물려놨습니다.');
  };
  return (
    <>
      <ModalLayout title="그룹 수정" buttonText="수정 완료" modalName="팀 게시자">
        <div className="mb-24 flex items-center gap-7 text-[1.4rem]">
          {profileImg === 'null' ? <img src={profile} alt="profile" /> : <div>해당이미지</div>}
          {nickName}
        </div>
        <div className="mb-[6.3rem] flex justify-between">
          <ModalInput />
          <ModalInput>
            <img src={EllipseColor} alt="colorchoice" />
            <button>
              <img src={dropDown} alt="dropDown" />
            </button>
          </ModalInput>
        </div>
        <div className="flex items-center gap-[1.2rem] text-[2rem]">팀원</div>
        <div className="h-[22.5rem] w-[68rem] border-[0.1rem] px-8 pt-8 shadow-md">
          {members.map((users, index) => (
            <div className="flex items-center justify-between text-[2rem]" key={index}>
              <img src={profile} alt="profile" />
              <div>{users.name}</div>
              <button onClick={handleExileMember}>추방</button>
            </div>
          ))}
        </div>
      </ModalLayout>
    </>
  );
}

export default GroupPutModal;
