interface Props {
  weekName: string;
}
function WeekBox({ weekName }: Props) {
  return (
    <div>
      <p>{weekName}요일</p>
    </div>
  );
}
export default WeekBox;
