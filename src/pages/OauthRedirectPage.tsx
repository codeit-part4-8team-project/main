import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';

interface OauthLoginResponse {
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
        navigate('/user/main');
      } else {
        //navigate('/signup');
        navigate('/user/main');
      }
    }
    if (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default OauthRedirectPage;
