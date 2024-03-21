import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolTip from '@/components/common/ToolTip';
import BoardList from '@/components/common/sideBar/BoardList';
import GroupList from '@/components/common/sideBar/GroupList';
import GroupModal from '@/components/Modal/GroupModal';
import { useModal } from '@/contexts/ModalProvider';
import PlusCircleIcon from '@/assets/PlusCircleIcon';
import ProfileIcon from '@/assets/ProfileIcon';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModalClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <GroupModal closeClick={handleToggleModalClick} />}
      <div className="fixed bottom-0 left-0 top-[8.2rem] w-[26rem] rounded-tr-3xl bg-gray100">
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
        <ProfileIcon size="sm" />
        <span className="text-body2-bold text-[#EDEEDC]">홍길동</span>
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
      <span className="text-body2-bold text-[#EDEEDC]">그룹</span>
      <button className="relative" onClick={handleClickOpenModal}>
        <PlusCircleIcon fill="#F0F0E2" />
        {/* <ToolTip /> */}
      </button>
      <GroupList />
    </div>
  );
}
