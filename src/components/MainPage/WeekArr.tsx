export const makeWeekArr = (date: Date): Array<[number, Date]> => {
  const firstDayOfWeek = new Date(date);
  firstDayOfWeek.setDate(date.getDate() - date.getDay()); // 해당하는 주의 첫 번째 날로 설정

  const _week: Array<[number, Date]> = Array.from({ length: 7 }, (_, i) => {
    const newDate = new Date(firstDayOfWeek.valueOf() + 86400000 * i);
    return [i, newDate];
  });

  return _week;
};
