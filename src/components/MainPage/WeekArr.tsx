export const makeWeekArr = (date: Date): Array<[number, Date]> => {
  const day = date.getDay();
  const _week: Array<[number, Date]> = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(date.valueOf() + 86400000 * (i - day));
    _week.push([i, newDate]);
  }
  return _week;
};
