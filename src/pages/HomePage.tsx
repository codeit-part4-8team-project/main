import ModalLayout from '@/components/common/ModalLayout';
import Nav from '@/components/common/Nav';
import GroupEditModal from '@/components/Modal/GroupEditModal';
import GroupModal from '@/components/Modal/GroupModal';
import ScheduleModal from '@/components/Modal/ScheduleModal';
import { useModal } from '@/contexts/ModalProvider';

const HomePage = () => {
  const openModal = useModal();
  const handleClickOpenModal = () => {
    openModal(({ close }) => <ScheduleModal closeClick={close} />);
  };
  // ScheduleModal
  // GroupEditModal
  return (
    <>
      <Nav />
      <button className="h-[15rem] w-[15rem] bg-black text-white" onClick={handleClickOpenModal}>
        TEST
      </button>
      {/* <GroupModal/> */}

      {/* <div>홈페이지입니다.</div> */}
    </>
  );
};
export default HomePage;
