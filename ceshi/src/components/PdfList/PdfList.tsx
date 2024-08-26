import React, { useState, useCallback, useRef, memo } from "react";
import { Modal } from "antd";
import type { RadioChangeEvent } from "antd";
import styles from "./PdfList.module.scss";
import PdfItem from "../PdfItem/PdfItem";
import KnowledgeGraph from "../KnowledgeGraph/KnowledgeGraph";
import { originToGraphData, similarToGraphData } from "../../utils/tool";
import { searchSimilarArticle } from "../../api/chat";
import RadioGroup from "../RadioGroup/RadioGroup";
import { OriginContentItem } from "../../types/commonTypes";

interface PdfListProps {
  originData: {
    question: string;
    content: OriginContentItem[];
  };
}

const PdfList: React.FC<PdfListProps> = ({ originData }) => {
  // console.log("PdfList");
  const [radioValue, setRadioValue] = useState("pdf");
  const [modalRadio, setModalRadio] = useState("pdf");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const similarRef = useRef<HTMLDivElement>(null);
  const [similarArticleData, setSimilarArticleData] = useState([]); // 相似条文数据
  const [similarGraphData, setSimilarGraphData] = useState({
    question: "",
    content: [],
  }); // 相似条文图谱数据

  // 切换pdf/图谱
  const changeRadio = useCallback((e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  }, []);

  // 查找相似条文数据
  const handleSimilar = useCallback(async (question: string, id: string) => {
    const res: any = await searchSimilarArticle(id);
    if (res.erro) {
      return;
    }
    setSimilarArticleData(res); // 条文数据
    setSimilarGraphData({ question: question, content: res }); // 图谱数据
    similarRef.current!.scrollTop = 0;
  }, []);

  // 相似条文弹窗
  const handleModal = useCallback(
    (question: string, id: string) => {
      setModalRadio("pdf");
      setIsModalOpen(true);
      handleSimilar(question, id);
    },
    [handleSimilar]
  );

  // 弹窗-切换pdf/图谱
  const changeModalRadio = useCallback((e: RadioChangeEvent) => {
    setModalRadio(e.target.value);
  }, []);

  return (
    <div className={styles.pdfContainer}>
      <div className={styles.radioContainer}>
        <RadioGroup value={radioValue} onChange={changeRadio} />
      </div>
      <div className={styles.pdfContent}>
        <div className={styles.pdfList}>
          {radioValue === "pdf" ? (
            originData.content.map((item: OriginContentItem, index: number) => (
              <PdfItem
                key={item.id}
                rank={index + 1}
                pdfData={item}
                handleSimilar={() => handleModal(item.book_name, item.id)}
              />
            ))
          ) : (
            <KnowledgeGraph atlasData={originToGraphData(originData)} />
          )}
        </div>
      </div>

      <Modal
        title="相似条文"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width="80%"
        centered
        footer={null}
      >
        <RadioGroup value={modalRadio} onChange={changeModalRadio} />
        <div className={styles.similarContainer} ref={similarRef}>
          {modalRadio === "pdf" ? (
            similarArticleData.map((item: OriginContentItem, index: number) => (
              <PdfItem
                key={item.id}
                rank={index + 1}
                pdfData={item}
                handleSimilar={() => handleSimilar(item.book_name, item.id)}
              />
            ))
          ) : (
            <KnowledgeGraph atlasData={similarToGraphData(similarGraphData)} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default memo(PdfList);
