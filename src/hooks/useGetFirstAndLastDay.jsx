import { format, lastDayOfMonth, set } from 'date-fns';
const useGetFirstAndLastDay = (m) => {
  const today = set(new Date(), { month: m });
  const firstDateOfMonth = format(today, 'yyyy-MM-01');
  const lastDateOfMonth = format(lastDayOfMonth(today), 'yyyy-MM-dd');
  return { firstDateOfMonth, lastDateOfMonth };
};
export default useGetFirstAndLastDay;
