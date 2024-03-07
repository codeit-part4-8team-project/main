import { ChangeEvent, useState } from 'react';
import Plus from '../../../public/plus.svg';
import ModalInput from '../common/ModalInput';
import ModalLayout from '../common/ModalLayout';

function AnnouncementModal() {
  const [announcemnetValue, setAnnouncemnetValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const handleAnnouncementValue = (e: ChangeEvent<HTMLInputElement>) => {
    setAnnouncemnetValue(e.target.value);
  };

  const handleMembervalue = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberValue(e.target.value);
  };
  return (
    <ModalLayout title="공지사항 생성" buttonText="이슈 생성" modalName="2024-03-04">
      <ModalInput placeholder="공지사항을 입력하세요" value={(e) => handleAnnouncementValue(e)} />
      <div className="mt-[4.7rem] flex text-[2rem]">
        팀원 태그
        <img src={Plus} alt="PlusImg" />
      </div>
      <div className="mt-[2.8rem] h-[22.5rem] w-[68rem] border-[0.1rem] pl-[4.8rem] pt-[3rem] shadow-md">
        <ModalInput placeholder="검색" value={(e) => handleMembervalue(e)} />
      </div>
    </ModalLayout>
  );
}

export default AnnouncementModal;
