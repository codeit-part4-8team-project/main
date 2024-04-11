import { Link } from 'react-router-dom';
import ToolTip from '@/components/common/ToolTip';
import BoardList from '@/components/common/sideBar/BoardList';
import GroupList from '@/components/common/sideBar/GroupList';
import GroupModal from '@/components/Modal/GroupModal';
import { useModal } from '@/contexts/ModalProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { useMyTeams } from '@/hooks/useMyTeams';
import PlusCircleIcon from '@/assets/PlusCircleIcon';
import ProfileImg from '@/assets/assets/profile-small.svg';

export default function SideBar() {
  return (
    <div className="fixed bottom-0 left-0 top-[8.2rem] z-50 w-[26rem] rounded-tr-3xl bg-gray100">
      <ProfileSection />
      <BoardList />
      <GroupSection />
    </div>
  );
}

function ProfileSection() {
  const { user } = useUserContext();

  return (
    <Link to={`/user/${user?.id}/mypage`}>
      <div className="my-[3.3rem] ml-16 flex items-center gap-[1.6rem]">
        <img
          src={user?.imageUrl || ProfileImg}
          alt="유저 프로필 이미지"
          className="h-[2.4rem] w-[2.4rem] rounded-full"
        />
        <span className="text-body2-bold text-[#EDEEDC]">{user?.name}</span>
      </div>
    </Link>
  );
}

function GroupSection() {
  const { myTeams } = useMyTeams();

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => <GroupModal closeClick={close} />);
  };

  return (
    <div className="relative mt-[120%] flex items-center justify-between bg-black py-[1.8rem] pl-16 pr-[2.4rem]">
      <span className="text-body2-bold text-[#EDEEDC]">그룹</span>
      <button className="relative" onClick={handleModalClick}>
        <PlusCircleIcon fill="#F0F0E2" />
        {myTeams.length === 0 && <ToolTip />}
      </button>
      <GroupList myTeams={myTeams} />
    </div>
  );
}
