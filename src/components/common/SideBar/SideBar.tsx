import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateIcon from '../../../../public/assets/plus-circle-light.svg';
import ProfileImg from '../../../../public/assets/profile-small.svg';
import GroupModal from '../../Modal/GroupModal';
import BoardList from './BoardList';
import GroupList from './GroupList';
import clsx from 'clsx';

interface SideBarGroupProp {
  onCreateClick: () => void;
}

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <GroupModal closeClick={handleCloseClick} />}
      <div
        className={clsx(`fixed bottom-0 left-0 top-[8.2rem] w-[26rem] rounded-tr-3xl bg-[#292929]`)}
      >
        <ProfileSection />
        <BoardList />
        <GroupSection onCreateClick={handleCreateClick} />
      </div>
    </>
  );
}

function ProfileSection() {
  return (
    <Link to="/myPage/1">
      <div className={clsx('my-[3.3rem] ml-16 flex items-center gap-[1.6rem]')}>
        <img src={ProfileImg} alt="프로필 이미지" />
        <span className={clsx(`text-[1.6rem] font-bold text-[#EDEEDC]`)}>홍길동</span>
      </div>
    </Link>
  );
}

function GroupSection({ onCreateClick }: SideBarGroupProp) {
  return (
    <div
      className={clsx(
        `relative mt-[47.8rem] flex items-center justify-between bg-[#222222] py-[1.8rem] pl-16 pr-[2.4rem]`,
      )}
    >
      <span className={clsx(`text-[1.6rem] font-bold text-[#EDEEDC]`)}>그룹</span>
      <button onClick={onCreateClick}>
        <img src={CreateIcon} alt="그룹 생성 버튼" />
      </button>
      <GroupList />
    </div>
  );
}
