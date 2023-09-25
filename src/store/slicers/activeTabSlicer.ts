import { createSlice } from '@reduxjs/toolkit';

import { TBurgerIngridientTabs } from '../../../interfaces/burger-ingredient-tabs-type'


const initialState: TBurgerIngridientTabs = {
  Соусы: 0,
  Начинки: 0,
  Булки: 0
};

const activeTabSlicer = createSlice({
  name: 'activeTab',
  initialState,
  reducers: {
    setTabState(state, action: { payload: { tab: 'Соусы' | 'Начинки' | 'Булки'; visiblePct: number } }) {
      state[action.payload.tab] = action.payload.visiblePct;
    },
  }
});

export const { setTabState } = activeTabSlicer.actions;

export default activeTabSlicer.reducer;
