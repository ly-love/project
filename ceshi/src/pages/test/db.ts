import Dexie, { type Table } from "dexie";

// 聊天信息表
export interface Message {
  id?: number;
  from: string;
  to: string;
  content: string;
  isQuestion: boolean;
  subject?: string;
}

export interface ProcessedMessage {
  id?: number;
  originalMessageId: number;
  processedText: string;
}

const db = new Dexie("ChatDatabase") as Dexie & {
  chats: Table<Message>;
  processedMessages: Table<ProcessedMessage>;
};

db.version(1).stores({
  chats: "++id, from,to,content, isQuestion, subject",
  processedMessages: "++id, originalMessageId, processedText",
});

export { db };
