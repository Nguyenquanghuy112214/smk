import { useDispatch, useSelector } from 'react-redux';
import { changeUCHistory } from '~/Redux/ChangeUCHistory';
export const useUCHistory = () => {
  const hour = useSelector(
    (state) =>
      state.UCHistory !== null &&
      state.UCHistory !== undefined &&
      state.UCHistory.hour !== null &&
      state.UCHistory.hour !== undefined &&
      state.UCHistory.hour
  );
  const minute = useSelector(
    (state) =>
      state.UCHistory !== null &&
      state.UCHistory !== undefined &&
      state.UCHistory.minute !== null &&
      state.UCHistory.minute !== undefined &&
      state.UCHistory.minute
  );

  const dispatch = useDispatch();

  const setUCHistory = (hour, minute) => {
    localStorage.setItem('UCHistory', JSON.stringify({ hour, minute }));
    const actionChangeUCHistory = changeUCHistory(hour, minute);
    dispatch(actionChangeUCHistory);
  };

  return { hour, minute, setUCHistory };
};
