export interface NodeItem {
  id: string;
  label: string;
  oriLabel?: string;
  size?: number;
  level?: number;
  title?: string;
  description?: string;
}

export interface EdgesItem {
  label: string;
  source: string;
  target: string;
}

export interface OriginContentItem {
  id: string;
  book_name: string;
  content: string;
  keywords: string;
  pdf_name: string;
}

export interface OriginItem {
  question: string;
  content: OriginContentItem[];
}
