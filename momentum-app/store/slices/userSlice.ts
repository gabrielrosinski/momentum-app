import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generatePromoCode as generatePromoCodeUtil } from '../../utils/promoCode';

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
        state.promoCode = generatePromoCodeUtil(state.name);
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
