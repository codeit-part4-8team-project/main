import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../../../../public/assets/profile-small.svg';
import ToolTip from '@/components/common/ToolTip';
import BoardList from '@/components/common/sideBar/BoardList';
import GroupList from '@/components/common/sideBar/GroupList';
import GroupModal from '@/components/Modal/GroupModal';
import { useModal } from '@/contexts/ModalProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import { Team, Teams } from '@/types/teamTypes';
import PlusCircleIcon from '@/assets/PlusCircleIcon';

export default function SideBar() {
  return (
    <div className="fixed bottom-0 left-0 top-[8.2rem] w-[26rem] rounded-tr-3xl bg-gray100">
      <ProfileSection />
      <BoardList />
      <GroupSection />
    </div>
  );
}

function ProfileSection() {
  const { user } = useUserContext();

  return (
    <Link to={`/user/${user?.id}/myPage`}>
      <div className="my-[3.3rem] ml-16 flex items-center gap-[1.6rem]">
        <img
          src={user ? user.imageUrl : ProfileImg}
          alt="유저 프로필 이미지"
          className="h-[2.4rem] w-[2.4rem] rounded-full"
        />
        <span className="text-body2-bold text-[#EDEEDC]">{user?.name}</span>
      </div>
    </Link>
  );
}

function GroupSection() {
  const [teams, setTeams] = useState<Team[]>([]);

  const { loading, error, data } = useAxios<Teams>(
    {
      path: '/team/my-team',
      method: 'GET',
    },
    true,
  );
  useEffect(() => {
    if (data && !loading) {
      setTeams(data.content);
    }
    if (error) {
      throw Error('내가 속한 팀을 불러올 수 없습니다.');
    }
  }, [data, loading, error]);

  const openModal = useModal();

  const handleModalClick = () => {
    openModal(({ close }) => <GroupModal closeClick={close} />);
  };

  return (
    <div className="relative mt-[120%] flex items-center justify-between bg-black py-[1.8rem] pl-16 pr-[2.4rem]">
      <span className="text-body2-bold text-[#EDEEDC]">그룹</span>
      <button className="relative" onClick={handleModalClick}>
        <PlusCircleIcon fill="#F0F0E2" />
        {teams.length === 0 && <ToolTip />}
      </button>
      <GroupList teams={teams} />
    </div>
  );
}
