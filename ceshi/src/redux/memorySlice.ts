import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface MemoryItem {
//   role: string;
//   content: string;
//   tool_calls?: null;
// }

interface MemoryState {
  // memoryList: Record<string, MemoryItem[]>;
  memoryList: Record<string, any>;
}

const initialState: MemoryState = {
  memoryList: {
    all_major: [],
    HigthwayBridge: [],
    HigthwaySubgrade: [],
    HigthwayTunnel: [],
    RailwayBridge: [],
    RailwaySubgrade: [],
    RailwayTunnel: [],
    EuropeanStandard: [],
    JD: [],
    XC: [],
    XL: [],
    GA: [],
    ZC: [],
    JZ: [],
    JG: [],
    NT: [],
    JL: [],
    JX: [],
    TX: [],
    XX: [],
    XH: [],
    DL: [],
    GD: [],
    JW: [],
    TF: [],
    GS: [],
    HB: [],
    GJ: [],
    JT: [],
  },
};

export const memorySlice = createSlice({
  name: "memory",
  initialState,

  reducers: {
    addMemoryList: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.memoryList[action.payload.key].push(action.payload.value);
    },
    clearMemoryList: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.memoryList[action.payload.key] = action.payload.value;
    },
  },
});

export const { addMemoryList, clearMemoryList } = memorySlice.actions;

export default memorySlice.reducer;
