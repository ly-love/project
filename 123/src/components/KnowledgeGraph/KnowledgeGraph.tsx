import React, { memo, useEffect, useRef, useState } from "react";
import G6 from "@antv/g6";
import { Graph } from "@antv/g6";
import classNames from "classnames";
import {
  modesDefault,
  defaultNode,
  defaultEdge,
} from "../../utils/graphConfig";
import styles from "./KnowledgeGraph.module.scss";
import { colors } from "../../utils/chatData";
import { searchSimilarArticle } from "../../api/chat";
import { similarToGraphData } from "../../utils/tool";
import { NodeItem, EdgesItem } from "../../types/commonTypes";

interface KnowledgeGraphProps {
  atlasData: {
    nodes: NodeItem[];
    edges: EdgesItem[];
  };
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ atlasData }) => {
  // console.log('KnowledgeGraph')
  const [graphData, setGraphData] = useState<{ nodes: any[]; edges: any[] }>({
    nodes: [],
    edges: [],
  });  // 图谱数据
  const containerRef = useRef<HTMLDivElement>(null);  // 图谱容器
  const graphRef = useRef<Graph>();

  useEffect(() => {
    setGraphData(atlasData);
  }, [atlasData]);

  useEffect(() => {
    if (graphRef.current || !containerRef.current) return;
    const tooltip = new G6.Tooltip({
      offsetX: 10,
      offsetY: 10,
      fixToNode: [1, 0.5],
      itemTypes: ["node"],
      getContent: (e: any) => {
        const outDiv = document.createElement("div");
        const model = e.item.getModel();
        const title = model.title || model.oriLabel;
        const description = model.description || "";
        outDiv.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p> `;
        return outDiv;
      },
    });

    const graph = new Graph({
      container: containerRef.current,
      layout: {
        type: "force2",
        preventOverlap: true,
        animate: true, // 设置为 false 可关闭布局动画
        nodeSpacing: 100,
        maxSpeed: 80,
      },
      fitCenter: true,
      modes: modesDefault,
      defaultNode,
      defaultEdge,
      plugins: [tooltip],
    });

    graph.on("node:click", async (ev: any) => {
      const { item } = ev; // 被点击的节点元素
      const { id, title } = item.getModel();
      const res: any = await searchSimilarArticle(id);
      const data = similarToGraphData({ question: title, content: res });
      setGraphData(data);
    });

    graphRef.current = graph;

    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (!graphRef.current) return;
    graphData.nodes.forEach(function (node: any) {
      if (!node.style) {
        node.style = {};
      }
      node.style.fill = colors[node.level % colors.length];
    });
    graphRef.current.data(graphData); // 绑定数据
    graphRef.current.render(); // 渲染图
  }, [graphData]);

  return (
    <div
      className={classNames(styles.graphContainer, "graphContainer")}
      ref={containerRef}
    ></div>
  );
};

export default memo(KnowledgeGraph);
