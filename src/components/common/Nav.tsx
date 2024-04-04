import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserProvider';
import { defaultInstance } from '@/hooks/useAxios';
import DarkGroupIcon from '@/assets/DarkGroupIcon';
import GroupIcon from '@/assets/GroupIcon';
import PlusCircleIcon from '@/assets/PlusCircleIcon';
import ProfileIcon from '@/assets/ProfileIcon';
import LogoImg from '@/assets/assets/Logo.svg';
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

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="modal absolute bottom-0 left-[-28.5rem] right-0 top-[9.7rem] z-50 flex flex-col justify-center">
      <div ref={modalRef} className="modal-content relative h-36 w-[38.4rem] rounded-lg ">
        {children}
      </div>
      //{' '}
    </div>
  );
};

function Nav() {
  const { user } = useUserContext();
  const [data, setData] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alarmData, setAlarmData] = useState<Alarm[]>([]);

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

  return (
    <div>
      <div className="z-1 fixed left-0 right-0 top-0 z-50 m-0  flex items-center justify-between bg-gray10">
        <div className="mb-[0.8rem] mt-[1.1rem] flex items-center">
          <a href="/" className="ml-16 mt-[1.7rem]">
            <img src={LogoImg} alt="로고 이미지" />
          </a>
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
          {isModalOpen ? (
            <Modal onClose={() => setIsModalOpen(false)}>
              {alarmData.map((alarm, index) => (
                <div
                  className="w-full  border border-gray30 bg-white  pb-12 pl-12 pr-[20.9rem] pt-12 shadow-md"
                  key={index}
                >
                  <div className="whitespace-nowrap text-body4-bold">
                    그룹 초대장이 도착했습니다
                  </div>
                  <span
                    className="close absolute right-2 top-2 cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    &times;
                  </span>
                  <div className="text-body4-regular">[{alarm.name}]</div>
                </div>
              ))}
            </Modal>
          ) : null}

          {data && data.imageUrl ? (
            <Link to={`/user/${user?.id}/mypage`}>
              <img
                className="h-[3.6rem] w-[3.6rem] rounded-full"
                src={data.imageUrl}
                alt="프로필 이미지"
              />
            </Link>
          ) : (
            <Link to={`/user/${user?.id}/mypage`}>
              <ProfileIcon size="lg" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
