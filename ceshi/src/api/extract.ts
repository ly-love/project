import request from "./request";

// 根据文本抽取信息
export const getExtract = (data: any) => {
  return request(`/foo/IE`, {
    method: "POST",
    data,
  });
};

