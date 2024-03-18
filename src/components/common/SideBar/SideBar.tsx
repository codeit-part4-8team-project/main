import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateIcon from '../../../../public/assets/plus-circle-light.svg';
import ProfileImg from '../../../../public/assets/profile-small.svg';
import GroupModal from '../../Modal/GroupModal';
import ToolTip from '../ToolTip';
import BoardList from './BoardList';
import GroupList from './GroupList';
import { useModal } from '@/contexts/ModalProvider';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <GroupModal closeClick={handleToggleModalClick} />}
      <div className="bg-gray100 fixed bottom-0 left-0 top-[8.2rem] w-[26rem] rounded-tr-3xl">
        <ProfileSection />
        <BoardList />
        <GroupSection />
      </div>
    </>
  );
}

function ProfileSection() {
  return (
    <Link to="/myPage/1">
      <div className="my-[3.3rem] ml-16 flex items-center gap-[1.6rem]">
        <img src={ProfileImg} alt="프로필 이미지" />
        <span className="text-[1.6rem] font-bold text-[#EDEEDC]">홍길동</span>
      </div>
    </Link>
  );
}

function GroupSection() {
  const openModal = useModal();
  const handleClickOpenModal = () => {
    openModal(({ close }) => <GroupModal closeClick={close}></GroupModal>);
  };

  return (
    <div className="relative mt-[47.8rem] flex items-center justify-between bg-black py-[1.8rem] pl-16 pr-[2.4rem]">
      <span className="text-[1.6rem] font-bold text-[#EDEEDC]">그룹</span>
      <button className="relative" onClick={handleClickOpenModal}>
        <img src={CreateIcon} alt="그룹 생성 버튼" />
        <div className="absolute -left-[7.4rem] -top-[5.1rem]">
          <ToolTip />
        </div>
      </button>
      <GroupList />
    </div>
  );
}
