import Nav from '@/components/common/Nav';
import AfterApproval from '@/components/common/modal/AfterApprovalModal';
import ModalCalendar from '@/components/common/modal/ModalCalendar';
import ModalLayout from '@/components/common/modal/ModalLayout';
import AnnouncementEditModal from '@/components/Modal/AnnouncementEditModal';
import AnnouncementModal from '@/components/Modal/AnnouncementModal';
import DetailScheduleModal from '@/components/Modal/DetailsScheduleModal';
import FreeBoardDetail from '@/components/Modal/FreeBoardDetail';
import FreeBoardEdit from '@/components/Modal/FreeBoardEdit';
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
import { Time } from '@/components/SchedulesPage/Tiem';
import { useModal } from '@/contexts/ModalProvider';
// import { useAxios } from '@/hooks/useAxios';
import axios from '@/hooks/testAxios';

const HomePage = () => {
  const openModal = useModal();
  const handleClickOpenModal = () => {
    // openModal(({ close }) => <GroupModal closeClick={close} />); // 에러메세지 큰건 해결
    // openModal(({ close }) => <GroupEditModal closeClick={close} />); // patch인데 put처럼 전체수정이 이루어짐
    // openModal(({ close }) => <InvitationGroupModal closeClick={close} />); // 여기 그룹초대받은 모달인데 수정사항 많음
    // openModal(({ close }) => <ScheduleModal closeClick={close} />); // 여기도 에러메세지남음
    // openModal(({ close }) => <DetailScheduleModal closeClick={close} />); // 여기도 끝 딱히 손댈거없어보임
    // openModal(({ close }) => <IssuesModal closeClick={close} />); // 여기는 그룹을 지울까말까 고민중이고, 멤버초대하는게 클릭시 자꾸 내 정보에대한 값을 리스폰스로 받아서 처리하기가 어려움. + 그리고 막상 받고 api쏘면 Null값이 들어옴
    // openModal(({ close }) => <NotMeIssuesModal closeClick={close} />); // 끝 여기도 끝 딱히 손댈거 없어보임
    // openModal(({ close }) => <MyIssuesModal closeClick={close} />); // 내 이슈인지 아닌지 어떻게 확인?
    // openModal(({ close }) => <FreeBoardModal closeClick={close} />); // 여기도 딱히 끝
    // openModal(({ close }) => <FreeBoardEdit closeClick={close} />); // 여기도 딱히 끝
    // openModal(({ close }) => <FreeBoardDetail closeClick={close} />); // 여기도 딱히 끝
    // openModal(({ close }) => <AnnouncementModal closeClick={close} />); // 여기서부터 집가서 다시 보고 첫번째부터 해결하기
    // openModal(({ close }) => <AnnouncementEditModal closeClick={close} />); // 임의로 만듦 나중에 디자인 확인 필요
    openModal(({ close }) => <AfterApproval closeClick={close} />);
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
      <Time />
    </>
  );
};
export default HomePage;
