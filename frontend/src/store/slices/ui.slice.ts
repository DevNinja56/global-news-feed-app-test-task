import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum modalType {
  'none',
  'confirm_user_modal',
  'select_country_and_language_modal',
}

interface UiState {
  modal: modalType | false;
  modalState: unknown;
}

const initialState: UiState = {
  modal: false,
  modalState: null,
};

export const uiSlice = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modal = false;
      state.modalState = null;
    },
    updateModalAndState: (
      state,
      action: PayloadAction<{ type: modalType; state: unknown }>
    ) => {
      state.modal = action.payload.type;
      state.modalState = action.payload.state;
    },
  },
});

export const { closeModal, updateModalAndState } = uiSlice.actions;
export default uiSlice.reducer;
