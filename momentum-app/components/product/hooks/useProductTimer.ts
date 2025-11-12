import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startTimer, updateRemainingTime } from '../../../store/slices/timerSlice';
import { TIMING } from '../../../constants/timing';

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
    }, TIMING.TIMER_UPDATE_INTERVAL);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [startTime, dispatch]);
};
