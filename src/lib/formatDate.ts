/* yyyy-mm-dd hh:mm:ss 형식의 날짜 문자열을 yyyy-mm-dd 형식으로 단순회하는 함수 */
export function toDateFormat(fullDate: string) {
  return fullDate.split(' ')[0];
}
