import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { useAxios } from '@/hooks/useAxios';

export interface UserContextValue {
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

export function useUserContext(update: boolean = false) {
  const context = useContext(UserContext);
  const { setUser } = context;
  if (context === null) {
    throw new Error('UserProvider 외부입니다.');
  }

  const { data, loading, error } = useAxios<User>(
    {
      path: '/user/',
    },
    update,
  );

  useEffect(() => {
    if (data && !loading) {
      setUser(data);
      console.log(data);
    }
    if (error) {
      console.error(error);
    }
  }, [data, loading, error, setUser]);

  return context;
}
