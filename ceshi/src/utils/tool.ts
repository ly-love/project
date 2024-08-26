import {
  NodeItem,
  EdgesItem,
  OriginItem,
  OriginContentItem,
} from "../types/commonTypes";

// 如果你的 originData 是一个包含 question 和 content 两个字段的对象，那么你应该使用 originData: OriginItem
// originData: OriginItem[] 表示 originData 是一个 OriginItem 类型的数组。
export function originToGraphData(originData: OriginItem) {
  let data = { nodes: [] as NodeItem[], edges: [] as EdgesItem[] };
  data.nodes.push({
    id: "1-0-1",
    label:
      originData.question.length > 15
        ? originData.question.slice(0, 15) + "..."
        : originData.question,
    oriLabel: originData.question,
    size: 50,
    level: 0,
  });
  originData.content.forEach((item: OriginContentItem) => {
    data.nodes.push({
      id: item.id,
      label: `${item.book_name} - ${item.content}`.slice(0, 15) + "...",
      title: `${item.book_name}`,
      description: `${item.content}`,
      level: 1,
    });
    data.edges.push({
      label: "条文",
      source: "1-0-1",
      target: item.id,
    });
  });

  return data;
}

interface SimilarItem {
  question: string;
  content: OriginContentItem[];
}

export function similarToGraphData(similarData: SimilarItem) {
  let data = { nodes: [] as NodeItem[], edges: [] as EdgesItem[] };
  if (!similarData.question) {
    return data;
  }
  data.nodes.push({
    id: "1-1-1",
    label:
      similarData.question.length > 15
        ? similarData.question.slice(0, 15) + "..."
        : similarData.question,
    oriLabel: similarData.question,
    size: 50,
    level: 0,
  });
  similarData.content.forEach((item: any) => {
    data.nodes.push({
      id: item.id,
      label: `${item.book_name} - ${item.content}`.slice(0, 15) + "...",
      title: `${item.book_name}`,
      description: `${item.content}`,
      level: 1,
    });
    data.edges.push({
      label: "条文",
      source: "1-1-1",
      target: item.id,
    });
  });
  return data;
}

interface pdfItem {
  book_name: string;
  keywords: string;
  md: string;
}
export function pdfToGLM(data: pdfItem[], question: string) {
  // let content = "接下来请根据搜索结果回答问题或做出名词解释：\n";
  // data.forEach((item, index) => {
  //   content += `${index + 1}、${item.book_name}规定： ${item.keywords}\n`;
  // });
  // content += `我的问题是：${question}`;
  // return content;

  let content = `"""具体的搜索结果""" \n`;
  data.forEach((item, index) => {
    content += `${index + 1}、《${item.book_name}》规定： ${item.md}\n`;
  });
  content += `"""名词或问题""" \n ${question} \n`;
  content += "接下来请根据搜索结果回答问题或做出名词解释";
  return content;
}
