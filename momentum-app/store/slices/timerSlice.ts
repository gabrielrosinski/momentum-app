import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  startTime: number | null;
  duration: number;
  expired: boolean;
  remainingTime: number;
}

const TIMER_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const initialState: TimerState = {
  startTime: null,
  duration: TIMER_DURATION,
  expired: false,
  remainingTime: TIMER_DURATION,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      if (!state.startTime) {
        state.startTime = Date.now();
        state.remainingTime = TIMER_DURATION;
        state.expired = false;
      }
    },
    updateRemainingTime: (state) => {
      if (state.startTime) {
        const elapsed = Date.now() - state.startTime;
        const remaining = Math.max(0, TIMER_DURATION - elapsed);

        state.remainingTime = remaining;

        if (remaining === 0) {
          state.expired = true;
        }
      }
    },
    expireTimer: (state) => {
      state.expired = true;
      state.remainingTime = 0;
    },
    loadTimerFromStorage: (state, action: PayloadAction<number>) => {
      const startTime = action.payload;
      if (startTime) {
        state.startTime = startTime;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, TIMER_DURATION - elapsed);

        state.remainingTime = remaining;
        state.expired = remaining === 0;
      }
    },
    resetTimer: (state) => {
      state.startTime = null;
      state.expired = false;
      state.remainingTime = TIMER_DURATION;
    },
  },
});

export const { startTimer, updateRemainingTime, expireTimer, loadTimerFromStorage, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;

// Helper function to format time
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
