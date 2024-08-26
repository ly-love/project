import request from "./request";

// 根据id查询相似条文
export const searchSimilarArticle = (id: string) => {
  return request(`/foo/Similar/${id}`, {
    method: "GET",
  });
};

interface VectorSearchItem {
  book_name: string;
  id: string;
  content: string;
}
// 问答向量搜索接口
export const getVectorSearch = (data: any): Promise<VectorSearchItem[]> => {
  return request("/foo/vectorSearch", {
    method: "POST",
    data,
  });
};

///GLM4
export const getGLM4 = (data: any) => {
  return request("/foo/GLM4", {
    method: "POST",
    data,
  });
};

///GLM4
export const getGLM4Stream = (data: any) => {
  return request("/foo/GLM4Stream", {
    method: "POST",
    data,
  });
};

// // 语音播放文字 - 文字转换成MP3格式音频
export const getMp3AudioByText = (data: any, signal: AbortSignal) => {
  return request("/foo/tts", {
    method: "POST",
    responseType: "blob",
    data,
    signal, // 将 AbortSignal 传递给 axios 请求
  });
};

// 语音播放文字 - 文字转换成MP3格式音频
// export const getMp3AudioByText = (data: object) => {
//   return request("/foo/tts", {
//     method: "POST",
//     responseType: "blob",
//     data,
//   });
// };

// 查询pdfurl
export const searchPdfUrl = (data: any) => {
  return request("/res/search/pdf", {
    method: "POST",
    data,
  });
};

// 语音录入 - 将语音转文字
export const getTextByAudio = (data: any) => {
  return request(
    `/transcribe/?initial_prompt=${encodeURIComponent("简体中文")}&language=zh`,
    {
      method: "POST",
      data,
    }
  );
};
