import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startTimer, updateRemainingTime } from '../../../store/slices/timerSlice';

export interface UseProductTimerParams {
  startTime: number | null;
}

export const useProductTimer = ({ startTime }: UseProductTimerParams): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Start timer if not already started
    if (!startTime) {
      dispatch(startTimer());
    }

    // Update remaining time every second
    const interval = setInterval(() => {
      dispatch(updateRemainingTime());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [startTime, dispatch]);
};
