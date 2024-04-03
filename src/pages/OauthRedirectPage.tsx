import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';

interface OauthLoginResponse {
  id: number;
  name: string;
  imageUrl: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  newAccount: boolean;
}

const OauthRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { provider } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const decodedCode = queryParams.get('code') ?? '';
  const code = encodeURIComponent(decodedCode);

  const { data, error } = useAxios<OauthLoginResponse>(
    {
      path: `/oauth/login/${provider}?code=${code}`,
      method: 'GET',
    },
    true,
  );
  useEffect(() => {
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      if (!data.newAccount) {
        navigate(`/user/${data.id}/main`);
      } else {
        navigate('/signup');
      }
    }
    if (error) {
      alert('로그인에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
      navigate('/');
      console.log(error);
    }
  }, [data, error]);

  return <div></div>; // 로고 나오면 가운데
};

export default OauthRedirectPage;
