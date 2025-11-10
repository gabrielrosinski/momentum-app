import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  name: string;
  promoCode: string;
}

const initialState: UserState = {
  email: '',
  name: '',
  promoCode: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    generatePromoCode: (state) => {
      if (state.name) {
        const now = new Date();
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const month = months[now.getMonth()];
        const year = now.getFullYear().toString().slice(-2);

        state.promoCode = `${state.name.toLowerCase()}_${month}${year}`;
      }
    },
    loadPromoCode: (state, action: PayloadAction<string>) => {
      state.promoCode = action.payload;
    },
    resetUser: (state) => {
      state.email = '';
      state.name = '';
      state.promoCode = '';
    },
  },
});

export const { setEmail, setName, generatePromoCode, loadPromoCode, resetUser } = userSlice.actions;
export default userSlice.reducer;
