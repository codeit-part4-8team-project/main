import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemDropDown from './ItemDropDown';
import { useAxios } from '@/hooks/useAxios';

export default function LogoutDropDown() {
  const { data, error, fetchData } = useAxios({});
  const navigate = useNavigate();

  const onLogoutClick = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      fetchData({ newPath: '/auth/logout', newMethod: 'POST' });
    }
  };

  useEffect(() => {
    if (data || error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  }, [data, error]); //서버에서 리프레시 삭제 실패해도 일단 로컬에서 토큰 다 없애고 로그아웃 시켜줘야함.

  return (
    <ItemDropDown
      options={['로그아웃']}
      action={onLogoutClick}
      className="top-[4.5rem] hidden hover:flex peer-hover:flex"
    ></ItemDropDown>
  );
}
