import AlertModal from '@/components/Modal/AlertModal';
import GroupEditModal from '@/components/Modal/GroupEditModal';
import { useModal } from '@/contexts/ModalProvider';
import { useAxios } from '@/hooks/useAxios';

const SigninPage = () => {
  //refetch 테스트 코드와 모달 테스트 코드 남겼습니다.
  console.log('컴포넌트 리렌더링됨');
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

  const openModal = useModal();
  const handleClickOpenModal = () => {
    openModal(({ close }) => <GroupEditModal closeClick={close}></GroupEditModal>);
  };
  const handleClickOpenMultiModal = () => {
    openModal(({ close }) => (
      <AlertModal buttonClick={close} buttonText="두 번째 모달 닫기">
        [선택그룹]을 정말 나가시겠습니까?
        <button
          className=" bg-teal-700"
          onClick={() => {
            openModal(({ close }) => (
              <AlertModal buttonClick={close} buttonText="세번째 모달 닫기">
                모달 속 모달
              </AlertModal>
            ));
          }}
        >
          모달에서 모달 띄우기
        </button>
      </AlertModal>
    ));
  };

  return (
    <div className="flex size-full min-h-screen flex-col items-center">
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Data: {`${data}`}</p>}
        <button onClick={handleRefetch}>Refetcher</button>
      </div>
      <button className=" bg-teal-700 text-4xl" onClick={handleClickOpenModal}>
        모달 테스터
      </button>
      <button className=" bg-fuchsia-500 text-4xl" onClick={handleClickOpenMultiModal}>
        모달 속에서 모달 띄우기
      </button>
    </div>
  );
};
export default SigninPage;
