import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import { User } from '@/types/user';

export default function PrivateRoutes() {
  const { user, setUser } = useUserContext();

  const { data, loading, error } = useAxios<User>(
    {
      path: '/user/',
    },
    !user,
  );
  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, loading, error, setUser]);

  if (loading) {
    //return <Outlet />;
    return <div></div>;
    //로딩 중 페이지를 만들기 or 그냥 Outlet 반환해서 빈 ui 라도 보게.
  }

  //여길 data 가 아니라 user state로 잡으면 loading 풀렸을 때 user는 반영이 안된 상태
  return data || user ? <Outlet /> : <Navigate replace to={'/signin'} />;
}
