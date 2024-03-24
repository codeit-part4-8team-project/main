import Nav from '@/components/common/Nav';
import ModalCalendar from '@/components/common/modal/ModalCalendar';
import ModalLayout from '@/components/common/modal/ModalLayout';
import FreeBoardModal from '@/components/Modal/FreeBoardModal';
import GroupEditModal from '@/components/Modal/GroupEditModal';
import GroupModal from '@/components/Modal/GroupModal';
import InvitationGroupModal from '@/components/Modal/InvitationGroupModal';
// import InvitationGroupModal from '@/components/Modal/InvitationGroupModal';
import IssuesModal from '@/components/Modal/IssuesModal';
import MyIssuesModal from '@/components/Modal/MyIssuesModal';
import NotMeIssuesModal from '@/components/Modal/NotMeIssuesModal';
// import MyIssuesModal from '@/components/Modal/MyIssuesModal';
import ScheduleModal from '@/components/Modal/ScheduleModal';
import { useModal } from '@/contexts/ModalProvider';
// import { useAxios } from '@/hooks/useAxios';
import axios from '@/hooks/testAxios';

const HomePage = () => {
  const openModal = useModal();
  const handleClickOpenModal = () => {
    // openModal(({ close }) => <GroupModal closeClick={close} />);
    // openModal(({ close }) => <ScheduleModal closeClick={close} />);
    // openModal(({ close }) => <GroupEditModal closeClick={close} />);
    // openModal(({ close }) => <InvitationGroupModal closeClick={close} />);
    // openModal(({ close }) => <IssuesModal closeClick={close} />);
    // openModal(({ close }) => <MyIssuesModal closeClick={close} />);
    // openModal(({ close }) => <NotMeIssuesModal closeClick={close} />);
    openModal(({ close }) => <FreeBoardModal closeClick={close} />);
  };
  // ScheduleModal
  // GroupEditModal

  // const handleClickAixos = () => {
  //   const { data, loading, error, fetchData } = useAxios({
  //     path: `test/token`,
  //     method: 'POST',
  //     data: {},
  //   });
  //   console.log('data', data);
  //   console.log('fetchData', fetchData);
  // };

  // 테스트 토큰입니다!
  const handleSubmit = async () => {
    const response = await axios.post('test/token');
    localStorage.setItem('login', response.data);
    console.log(response);
    return response;
    // test/token
  };
  const handleLogout = () => {
    localStorage.removeItem('login');
  };

  return (
    <>
      <Nav />
      <button
        className="mr-[5rem] h-[15rem] w-[15rem] bg-black text-white"
        onClick={handleClickOpenModal}
      >
        TEST
      </button>
      <button className="mr-[5rem] h-[15rem] w-[15rem] bg-black text-white" onClick={handleSubmit}>
        Axios
      </button>
      <button className="h-[15rem] w-[15rem] bg-black text-white" onClick={handleLogout}>
        logout
      </button>
      <ModalCalendar />
      {/* <div>홈페이지입니다.</div> */}
    </>
  );
};
export default HomePage;
