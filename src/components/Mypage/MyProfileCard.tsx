import EditProfileModal from '../Modal/EditProfileModal';
import TextButton from '../common/TextButton';
import ProfileCard from '@/components/common/card/ProfileCard';
import { useModal } from '@/contexts/ModalProvider';
import { useUserContext } from '@/contexts/UserProvider';

export default function MyProfileCard() {
  const userContext = useUserContext();
  const openModal = useModal();
  const handleProfileEditClick = () => {
    if (userContext.user) {
      openModal(({ close }) => (
        <EditProfileModal userContext={userContext} handleClose={close}></EditProfileModal>
      ));
    }
  };

  return (
    <div className="flex grow basis-[38.4rem] flex-col justify-between gap-[4.8rem] rounded-[2.4rem] bg-white px-12 pb-[4.8rem] pt-28">
      <ProfileCard></ProfileCard>
      <TextButton buttonSize="md" color="white" onClick={handleProfileEditClick}>
        프로필 변경
      </TextButton>
    </div>
  );
}
