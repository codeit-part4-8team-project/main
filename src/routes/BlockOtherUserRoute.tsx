import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useUserContext } from '@/contexts/UserProvider';

export default function BlockOtherUserRoute() {
  const { userId } = useParams();
  const { user } = useUserContext();
  if (user) {
    !(user.id === Number(userId)) && <Navigate replace to={`user/${user.id}/main`} />;
  }

  return <Outlet />;
}
