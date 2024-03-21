import DividerIcon from '@/assets/DividerIcon';

interface TabsListProps {
  className: string;
}

const TABS = ['홈', '팀 캘린더', '칸반보드', '공지사항', '자유게시판', '팀원', '콘텐츠'];

export default function TabsList({ className }: TabsListProps) {
  return (
    <div className={`flex items-center gap-[2.4rem] ${className}`}>
      {TABS.map((tab, idx) => {
        return (
          <>
            {idx !== 0 && <DividerIcon />}
            <button type="button" className="text-body3-medium text-gray50">
              {tab}
            </button>
          </>
        );
      })}
    </div>
  );
}
