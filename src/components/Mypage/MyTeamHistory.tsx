import Pagenation from '../common/pagenation/Pagenation';
import MyTeamHistoryTable from './MyTeamHistoryTable';

export default function MyTeamHistory() {
  return (
    <div className="flex grow basis-[113.8rem] flex-col items-center gap-12 rounded-[2.4rem] bg-white px-12 pb-[5.2rem] pt-[3.7rem]">
      <span className="self-start text-body3-bold text-gray100">나의 팀 히스토리</span>
      <MyTeamHistoryTable></MyTeamHistoryTable>
      <Pagenation></Pagenation>
    </div>
  );
}
