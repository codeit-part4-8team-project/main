import profile from '../../../public/profile.svg';
import ModalForm from '../ModalAtuom/ModalForm';
import ModalLayout from '../common/ModalLayout';

interface ScheduleModalProps {
  closeClick?: () => void;
}

function ScheduleModal({ closeClick }: ScheduleModalProps) {
  return (
    <ModalLayout title="일정 추가" closeClick={closeClick} size="md">
      <ModalForm
        firstLabel="제목"
        firstPlaceholder="일정 제목을 입력해 주세요."
        firstHtmlForId="title"
        firstType="text"
        secondLabel="날짜"
        secondPlaceholder="2024년 3월 13일 (수요일)"
        secondHtmlForId="schedule"
        secondType="date"
        who="게시자 (나)"
        profile={profile}
        userNickName="#userNickName"
      />
    </ModalLayout>
  );
}

export default ScheduleModal;
