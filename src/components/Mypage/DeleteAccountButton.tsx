import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '@/hooks/useAxios';

export default function DeleteAccountButton() {
  const { data, error, fetchData } = useAxios<string>({});
  const navigate = useNavigate();

  const handleDeleteAccountClick = () => {
    if (
      confirm(
        '정말 키피어피를 탈퇴하시겠습니까? 한 번 탈퇴한 회원의 정보 및 팀 게시글은 영구히 복구되지 않습니다.',
      )
    ) {
      fetchData({ newPath: '/user/', newMethod: 'DELETE' });
    }
  };
  useEffect(() => {
    if (data) {
      alert('회원 탈퇴되었습니다.');
      navigate('/');
    }
    if (error) {
      alert('회원 탈퇴에 실패하였습니다. 관리자에게 문의해주세요.');
    }
  }, [data, error]);

  return (
    <button
      onClick={handleDeleteAccountClick}
      className="absolute -bottom-[5.2rem] right-0 text-body3-regular text-black underline underline-offset-2"
    >
      회원탈퇴
    </button>
  );
}
