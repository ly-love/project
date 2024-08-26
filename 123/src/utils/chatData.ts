import iconSrc from "../assets/images/icon.png";

interface ModelItem {
  value: string;
  label: string;
}
export const modelList: ModelItem[] = [
  { value: "ChatGLM-6B", label: "ChatGLM-6B" },
];

export const colors: string[] = ["#83bbff", "#fac858", "#73c0de", "#ea7ccc"];

// 导航栏
interface MenuItem {
  id: string;
  title: string;
  path: string;
  imgSrc: string;
}
export const menuList: MenuItem[] = [
  { id: "1", title: "规范问答", path: "/chat", imgSrc: iconSrc },
  { id: "2", title: "信息抽取", path: "/extract", imgSrc: iconSrc },
  // { id: "2", title: "关于我们", path: "/about" },
  // { id: "3", title: "更新日志", path: "/blog" },
  // { id: "4", title: "访问记录", path: "/record" },
];

// 推荐
interface recommendItem {
  id: string;
  insideHref: string;
  outsideHref: string;
  imgSrc?: string;
  iconClass: string;
  iconColor: string;
  title: string;
  desc: string;
}
export const recommendList: recommendItem[] = [
  {
    id: "1",
    insideHref:
      "http://192.10.50.67/knowledge/graph/show/%E6%A1%A5%E6%A2%81%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1-%E6%AD%A3%E5%BC%8F%E7%89%88",
    outsideHref:
      "https://www.aicodeas.com/knowledge/graph/show/%E6%A1%A5%E6%A2%81%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1-%E6%AD%A3%E5%BC%8F%E7%89%88",
    // imgSrc: graphSrc,
    iconClass: "icon-tupu-X",
    iconColor: "#2d83ff",
    title: "知识图谱",
    desc: "知识图谱实现数据可视化",
  },
  {
    id: "2",
    insideHref: "http://192.10.50.67/search",
    outsideHref: "https://www.aicodeas.com/search",
    // imgSrc: searchSrc,
    iconClass: "icon-zhinengsousuo",
    iconColor: "#9d6eff",
    title: "智能搜索",
    desc: "专业规范搜索，赋能勘察设计",
  },
  {
    id: "3",
    insideHref: "http://192.10.50.67:3000/integration",
    outsideHref: "https://www.aicodeas.com/integration",
    // imgSrc: librarySrc,
    iconClass: "icon-boke",
    iconColor: "#ffb52d",
    title: "四库融合",
    desc: "涵盖勘察、线、路、桥、隧",
  },
  {
    id: "4",
    insideHref: "http://192.10.50.67/ocr",
    outsideHref: "https://www.aicodeas.com/ocr",
    // imgSrc: ocrSrc,
    iconClass: "icon-OCRshibie_fapiaoshibie",
    iconColor: "#1ad8d3",
    title: "OCR识别",
    desc: "在线OCR识别功能",
  },
];

// 下拉选择
export const majorOptions = [
  { value: "all_major", label: "所有专业" },
  { value: "RailwayBridge", label: "铁路桥梁" },
  { value: "RailwaySubgrade", label: "铁路路基" },
  { value: "RailwayTunnel", label: "铁路隧道" },
  { value: "HigthwayBridge", label: "公路桥梁" },
  { value: "HigthwaySubgrade", label: "公路路基" },
  { value: "HigthwayTunnel", label: "公路隧道" },
  { value: "EuropeanStandard", label: "欧洲规范", disabled: true },
  { value: "JD", label: "经调", disabled: true },
  { value: "XC", label: "行车", disabled: true },
  { value: "XL", label: "线路", disabled: true },
  { value: "GA", label: "轨道", disabled: true },
  { value: "ZC", label: "站场", disabled: true },
  { value: "JZ", label: "建筑", disabled: true },
  { value: "JG", label: "结构", disabled: true },
  { value: "NT", label: "暖通", disabled: true },
  { value: "JL", label: "机辆", disabled: true },
  { value: "JX", label: "机械", disabled: true },
  { value: "TX", label: "通信", disabled: true },
  { value: "XX", label: "信息", disabled: true },
  { value: "XH", label: "信号", disabled: true },
  { value: "DL", label: "电力", disabled: true },
  { value: "GD", label: "供变电", disabled: true },
  { value: "JW", label: "接触网", disabled: true },
  { value: "TF", label: "通信防护", disabled: true },
  { value: "GS", label: "给水排水", disabled: true },
  { value: "HB", label: "环保", disabled: true },
  { value: "GJ", label: "工经", disabled: true },
  { value: "JT", label: "交通工程", disabled: true },
];
