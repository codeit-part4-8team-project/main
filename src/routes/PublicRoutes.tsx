import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserProvider';
import { useAxios } from '@/hooks/useAxios';
import { User } from '@/types/user';

export default function PublicRoutes() {
  const { user, setUser } = useUserContext();
  const token = localStorage.getItem('accessToken') || localStorage.getItem('refreshToken');

  const { data, loading, error } = useAxios<User>(
    {
      path: '/user/',
    },
    !user && Boolean(token),
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
    return <Outlet />;
  }

  return data ? <Navigate replace to={`user/${user?.id}/main`} /> : <Outlet />;
}
