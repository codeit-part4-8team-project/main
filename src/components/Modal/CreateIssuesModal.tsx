import { ChangeEvent, useState } from 'react';
import PlusImg from '../../../public/plus.svg';
import ModalInput from '../common/ModalInput';
import ModalLayout from '../common/ModalLayout';

function CreateIssuesModal() {
  const [tagValues, setTagValues] = useState('');
  const [members, setMembers] = useState('');
  const handleTagClick = () => {
    console.log('TagClick!!');
  };

  const handleTagValues = (e: ChangeEvent<HTMLInputElement>) => {
    setTagValues(e.target.value);
  };
  const handleMembervalue = (e: ChangeEvent<HTMLInputElement>) => {
    setMembers(e.target.value);
    console.log(members);
  };

  return (
    <ModalLayout title="이슈 생성" buttonText="이슈 생성" modalName="이슈 게시자">
      <ModalInput placeholder="이슈를 입력하세요" />
      <div className="mt-[4.5rem] flex gap-5 text-[2rem]">
        관련태그
        <button onClick={handleTagClick}>
          <img src={PlusImg} alt="plusImg" />
        </button>
      </div>
      <input
        className="mt-[2.2rem] rounded-full border-[0.1rem] border-[#DFDFDF] p-[0.6rem]"
        placeholder="관련 태그를 입력하세요"
        onChange={(e) => handleTagValues(e)}
      />
      <div className="mt-[8.2rem] flex gap-5 text-[2rem]">
        팀원태그
        <button onClick={handleTagClick}>
          <img src={PlusImg} alt="plusImg" />
        </button>
      </div>
      <div className="h-[22.5rem] w-[68rem] border-[0.1rem] pl-[4.8rem] pt-[3rem] shadow-md">
        <ModalInput placeholder="검색" value={(e) => handleMembervalue(e)} />
      </div>
    </ModalLayout>
  );
}

export default CreateIssuesModal;
