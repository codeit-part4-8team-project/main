import BoardSection from '@/components/common/BoardSection';
import DeleteAccountButton from '@/components/Mypage/DeleteAccountButton';
import MyProfileCard from '@/components/Mypage/MyProfileCard';
import MyTeamHistory from '@/components/Mypage/MyTeamHistory';
import { ModalProvider } from '@/contexts/ModalProvider';

export default function UserMyPage() {
  return (
    <BoardSection title="Mypage">
      <ModalProvider>
        <div className="mt-[1.8rem] flex h-[51.4rem] flex-col">
          <div className="relative flex grow justify-stretch gap-12">
            <MyProfileCard></MyProfileCard>
            <MyTeamHistory></MyTeamHistory>
            <DeleteAccountButton />
          </div>
        </div>
      </ModalProvider>
    </BoardSection>
  );
}
