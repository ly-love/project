// import CryptoJS from "crypto-js";

// // 加密函数
// export function encryptURL(url: string): string {
//   const SECRET_KEY = "your-secret-key"; // 替换为你的加密密钥

//   return CryptoJS.AES.encrypt(url, SECRET_KEY).toString();
// }

import CryptoJS from "crypto-js";

// 加密函数
export function encryptURL(url, SECRET_KEY) {
  return CryptoJS.AES.encrypt(url, SECRET_KEY).toString();
}
