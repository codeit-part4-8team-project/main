import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { useModal } from './ModalProvider';
import AlertModal from '@/components/Modal/AlertModal';
import { useAxios } from '@/hooks/useAxios';

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const { user, setUser } = useContext(UserContext);
  const openModal = useModal();
  const navigate = useNavigate();
  const { data, loading, error } = useAxios<User>(
    {
      path: '/user/',
    },
    !user,
  );

  useEffect(() => {
    if (data && !loading) {
      setUser(data);
      console.log(data);
    }
    if (error) {
      openModal(({ close }) => (
        <AlertModal
          buttonClick={() => {
            close();
            navigate('/Signin');
          }}
          buttonText="로그인 페이지로"
        >
          유저 정보를 불러오는 데에 실패하였습니다.
        </AlertModal>
      ));
    }
  }, [data, loading, error, setUser]);

  return { user, setUser };
}
