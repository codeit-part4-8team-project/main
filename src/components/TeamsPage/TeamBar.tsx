import TabsList from '@/components/TeamsPage/Tabs/TabsList';
import { useTeam } from '@/contexts/TeamProvider';
import ColorChipIcon from '@/assets/ColorChipIcon';

export default function TeamBar() {
  const {
    currentTeam: { color, name },
  } = useTeam();

  return (
    <div className="fixed top-[8.8rem] mb-12 flex items-center gap-[6.2rem]">
      <div className="flex w-fit gap-4">
        <ColorChipIcon fill={color} />
        <span className="text-body1-bold text-gray100">{name}</span>
      </div>
      <TabsList />
    </div>
  );
}
