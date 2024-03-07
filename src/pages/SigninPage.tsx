import { useAxios } from '@/hooks/useAxios';

const SigninPage = () => {
  const payload = { email: '이메일입니다', password: '비밀번호입니다' };
  const { data, loading, error, fetchData } = useAxios({
    path: '/test/',
    method: 'GET',
    data: {},
  });

  const handleRefetch = () => {
    fetchData({
      newData: payload,
    });
  };
  //refetch를 이벤트 핸들러에 포함하여 새 요청을 보냅니다.
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data: {`${data}`}</p>}

      <button onClick={handleRefetch}>Refetcher</button>
    </div>
  );
  return <div>여기는 로그인페이지입니다.</div>;
};
export default SigninPage;
