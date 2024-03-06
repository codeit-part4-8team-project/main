import { ChangeEvent, useState } from 'react';
import Mock from '../../../public/data/Mock.json';
import EllipseColor from '../../../public/images/EllipseColor.svg';
import dropDown from '../../../public/images/dorpdown.svg';
import plus from '../../../public/plus.svg';
import profile from '../../../public/profile.svg';
import ModalInput from '../common/ModalInput';
import ModalLayout from '@/components/common/ModalLayout';

function GroupModal() {
  const [teamNameValue, setTeamNameValue] = useState<string>('');
  const [teamColorValue, setTeamColorValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const { userData } = Mock; // userMockData
  const [{ userId, profileImg, nickName, birth }] = userData; // userMockData

  // 팀 이름
  const handleTeamNamevalue = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamNameValue(e.target.value);
  };

  // 팀 컬러
  const handleTeamColorvalue = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamColorValue(e.target.value);
  };

  // 멤버 초대
  const handleMembervalue = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberValue(e.target.value);
  };
  return (
    <ModalLayout title="그룹 생성" buttonText="팀 생성" modalName="그룹 게시자">
      <div className="mb-24 flex items-center gap-7 text-[1.4rem]">
        <img src={profile} alt="profile" />
        {nickName}
      </div>
      <div className="mb-[6.3rem] flex justify-between">
        <ModalInput placeholder="팀 이름을 입력하세요" value={(e) => handleTeamNamevalue(e)} />
        <ModalInput placeholder="팀 컬러를 선택하세요" value={(e) => handleTeamColorvalue(e)}>
          <img src={EllipseColor} alt="colorchoice" />
          <button>
            <img src={dropDown} alt="dropDown" />
          </button>
        </ModalInput>
      </div>
      <div className="flex items-center gap-[1.2rem] text-[2rem]">
        팀원 초대
        <button>
          <img src={plus} alt="plusImg" />
        </button>
      </div>
      <div className="h-[22.5rem] w-[68rem] border-[0.1rem] pl-[4.8rem] pt-[3rem] shadow-md">
        <ModalInput placeholder="검색" value={(e) => handleMembervalue(e)} />
      </div>
    </ModalLayout>
  );
}
export default GroupModal;
