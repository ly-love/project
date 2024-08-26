import Dexie, { type Table } from "dexie";

// Define the major
export const majors = [
  "all_major",
  "RailwayBridge",
  "RailwaySubgrade",
  "RailwayTunnel",
  "HigthwayBridge",
  "HigthwaySubgrade",
  "HigthwayTunnel",
  "EuropeanStandard",
] as const;
export type Major = (typeof majors)[number];

// Define the Message interface
export interface Message {
  id?: number;
  from: string;
  to: string;
  content: Array<string>;
  isQuestion?: boolean;
}

// Define the Article interface
export interface Article {
  id?: number;
  content: string;
  role: string;
  tool_calls?: null;
}

// Create a type for the stores object
type Stores = {
  [key: string]: string;
};

// Generate the stores object
const stores: Stores = majors.reduce((acc: Stores, major: Major) => {
  acc[`${major}Messages`] = "++id, from,to,content, isQuestion";
  acc[`${major}Articles`] = "++id, content, role, tool_calls";
  return acc;
}, {});

// Create the database instance
const db = new Dexie("ChatDatabase") as Dexie & {
  [key: string]: Table<Message> | Table<Article>;
};

db.version(1).stores(stores);

export { db };

// import Dexie, { type Table } from "dexie";

// // Define the subjects
// export const subjects = [
//   "数学",
//   "英语",
//   "语文",
//   "物理",
//   "化学",
//   "地理",
//   "历史",
// ] as const;
// export type Subject = (typeof subjects)[number];

// // Define the Message interface
// export interface Message {
//   id?: number;
//   from: string;
//   to: string;
//   content: string;
//   isQuestion: boolean;
// }

// // Define the Article interface
// export interface Article {
//   id?: number;
//   content: string;
//   role: string;
//   tool_calls?: null;
// }

// // Create a type for the stores object
// type Stores = {
//   [key: string]: string;
// };

// // Generate the stores object
// const stores: Stores = subjects.reduce((acc: Stores, subject: Subject) => {
//   acc[`${subject}Messages`] = "++id, from,to,content, isQuestion";
//   acc[`${subject}Articles`] = "++id, content, role, tool_calls";
//   return acc;
// }, {});

// // Create the database instance
// const db = new Dexie("ChatDatabase") as Dexie & {
//   [key: string]: Table<Message> | Table<Article>;
// };

// db.version(1).stores(stores);

// export { db };
