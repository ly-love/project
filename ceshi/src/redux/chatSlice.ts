import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  loading: boolean;
  loadingTxt: string;
  copyMsg: string;
  chatList: Record<string, any>; // 聊天记录
  originList: Record<string, any>; // 右侧pdf列表知识图谱数据(问答原文)   //Record<string, any>是一个泛型类型，它创建了一个对象类型，其键是字符串类型，值是任意类型（any）
}

const initialState: ChatState = {
  loading: false,
  loadingTxt: "查询中....",
  copyMsg: "",
  chatList: {
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
  originList: {
    all_major: {},
    HigthwayBridge: {},
    HigthwaySubgrade: {},
    HigthwayTunnel: {},
    RailwayBridge: {},
    RailwaySubgrade: {},
    RailwayTunnel: {},
    EuropeanStandard: {},
    JD: {},
    XC: {},
    XL: {},
    GA: {},
    ZC: {},
    JZ: {},
    JG: {},
    NT: {},
    JL: {},
    JX: {},
    TX: {},
    XX: {},
    XH: {},
    DL: {},
    GD: {},
    JW: {},
    TF: {},
    GS: {},
    HB: {},
    GJ: {},
    JT: {},
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    changeLoadingTxt: (state, action: PayloadAction<string>) => {
      state.loadingTxt = action.payload;
    },
    updateCopyMsg: (state, action: PayloadAction<string>) => {
      state.copyMsg = action.payload;
    },
    addChatList: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.chatList[action.payload.key].push(action.payload.value);
    },
    clearChatList: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.chatList[action.payload.key] = action.payload.value;
    },
    changeOriginList: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.originList[action.payload.key] = action.payload.value;
    },
    clearOriginList: (
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state.originList[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  changeLoading,
  changeLoadingTxt,
  updateCopyMsg,
  addChatList,
  clearChatList,
  changeOriginList,
  clearOriginList,
} = chatSlice.actions;

export default chatSlice.reducer;
