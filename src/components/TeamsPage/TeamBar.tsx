import TabsList from '@/components/TeamsPage/Tabs/TabsList';
import ColorChipIcon from '@/assets/ColorChipIcon';

export default function TeamBar() {
  return (
    <div className="fixed top-[8.8rem] mb-12 flex items-center gap-[6.2rem]">
      <div className="flex w-fit gap-4">
        <ColorChipIcon fill="#7187FE" />
        <span className="text-body1-bold text-gray100">토익 공부 모임</span>
      </div>
      <TabsList />
    </div>
  );
}
