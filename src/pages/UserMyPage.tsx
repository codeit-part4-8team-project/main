import BoardSection from '@/components/common/BoardSection';
import MyProfileCard from '@/components/Mypage/MyProfileCard';
import MyTeamHistory from '@/components/Mypage/MyTeamHistory';
import { ModalProvider } from '@/contexts/ModalProvider';

export default function UserMyPage() {
  return (
    <BoardSection title="Mypage">
      <ModalProvider>
        <div className="mt-[1.8rem] flex h-[51.4rem] flex-col">
          <div className="flex grow justify-stretch gap-12">
            <MyProfileCard></MyProfileCard>
            <MyTeamHistory></MyTeamHistory>
          </div>
        </div>
      </ModalProvider>
    </BoardSection>
  );
}
