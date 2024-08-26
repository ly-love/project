import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  marjor: string;
  promote_length: number;
  top_p: number;
  temperature: number;
  model: string; // 模型
}

const initialState: SettingsState = {
  marjor: "RailwayBridge", // 默认提问窗口
  promote_length: 10,
  top_p: 0.3,
  temperature: 0.3,
  model: "ChatGLM-6B", // 模型
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    changeMarjor: (state, action: PayloadAction<string>) => {
      state.marjor = action.payload;
    },
    changePromoteLength: (state, action: PayloadAction<number>) => {
      state.promote_length = action.payload;
    },
    changeTop: (state, action: PayloadAction<number>) => {
      state.top_p = action.payload;
    },
    changeTemperature: (state, action: PayloadAction<number>) => {
      state.temperature = action.payload;
    },
    changeModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
  },
});

export const {
  changeMarjor,
  changePromoteLength,
  changeTop,
  changeTemperature,
  changeModel,
} = settingsSlice.actions;

export default settingsSlice.reducer;
