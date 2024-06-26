import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InvitationGroupModal from '../Modal/InvitationGroupModal';
import LogoutDropDown from './LogoutDropDown';
import NavModal from './NavModal';
import { useModal } from '@/contexts/ModalProvider';
import { useUserContext } from '@/contexts/UserProvider';
import { defaultInstance } from '@/hooks/useAxios';
import DarkGroupIcon from '@/assets/DarkGroupIcon';
import GroupIcon from '@/assets/GroupIcon';
import KeepyUppyIcon from '@/assets/KeepyUppyIcon';
import KeepyUppyLogo from '@/assets/KeepyUppyLogo';
import PlusCircleIcon from '@/assets/PlusCircleIcon';
import ProfileIcon from '@/assets/ProfileIcon';
import globalLink from '@/assets/assets/globe-dark.svg';

interface UserData {
  id: number;
  name: string;
  imageUrl: string;
  username: string;
  oauthId: string;
  provider: string;
  bio: string;
}

interface Alarm {
  id: number;
  name?: string;
  description: string;
  color: string | null;
}

function Nav() {
  const { user } = useUserContext();
  const [data, setData] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alarmData, setAlarmData] = useState<Alarm[]>([]);

  const openModal = useModal();
  useEffect(() => {
    defaultInstance
      .get('http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api/user/')
      .then((response) => {
        if (response && response.data) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    defaultInstance
      .get('http://ec2-43-203-69-64.ap-northeast-2.compute.amazonaws.com:8080/api/team/pending')
      .then((response) => {
        if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
          setAlarmData(response.data); // Assuming only one alarm data is returned
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleModalClick = (data: number) => {
    openModal(({ close }) => <InvitationGroupModal teamId={data} closeClick={close} />);
  };

  return (
    <div className="z-1 fixed left-0 right-0 top-0 z-50 m-0 flex h-[5.8rem] items-center justify-between bg-gray10">
      <div className="mb-[0.8rem] mt-[1.1rem] flex items-center">
        <Link
          to={`/user/${user?.id}/main`}
          className="ml-16 flex items-center gap-[0.8rem] self-center"
        >
          <KeepyUppyIcon />
          <KeepyUppyLogo size="sm" />
        </Link>
        <div className="ml-[17.4rem] flex items-center gap-[0.8rem]">
          <a href="#" className="relative h-[3.6rem] w-[3.6rem] rounded-full bg-gray80">
            <img
              className="[0.6rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              src={globalLink}
              alt="글로벌 아이콘"
            />
          </a>
          <a href="#" className="mr-2.5">
            <PlusCircleIcon />
          </a>
        </div>
      </div>
      <div className="relative my-2.5 mr-6 flex items-center gap-8">
        {alarmData.length > 0 ? (
          <DarkGroupIcon onClick={() => setIsModalOpen(true)} className="" />
        ) : (
          <GroupIcon />
        )}
        {isModalOpen && (
          <NavModal onClose={() => setIsModalOpen(false)}>
            {alarmData.map((alarm, index) => (
              <div
                className="w-full border border-gray30 bg-white pb-12 pl-12 pr-[20.9rem] pt-12 shadow-md"
                key={index}
                onClick={() => handleModalClick(alarm?.id)}
              >
                <div className="whitespace-nowrap text-body4-bold">그룹 초대장이 도착했습니다</div>
                <div className="text-body4-regular">[{alarm.name}]</div>
              </div>
            ))}
          </NavModal>
        )}

        {data && data.imageUrl ? (
          <Link to={`/user/${user?.id}/mypage`} className="peer">
            <img
              className="h-[3.6rem] w-[3.6rem] rounded-full"
              src={data.imageUrl}
              alt="프로필 이미지"
            />
          </Link>
        ) : (
          <Link to={`/user/${user?.id}/mypage`} className="peer">
            <ProfileIcon size="lg" />
          </Link>
        )}
        <div className="peer absolute right-0 top-0 -z-10 h-[5.4rem] w-[3.6rem]"></div>
        <LogoutDropDown />
      </div>
    </div>
  );
}

export default Nav;
