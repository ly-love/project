import React, { memo } from "react";
import classNames from "classnames";
import styles from "./PdfItem.module.scss";
import { Tag, message } from "antd";
import { searchPdfUrl } from "../../api/chat";
import { OriginContentItem } from "../../types/commonTypes";
import { encryptURL } from "../../utils/encryption";

interface PdfItemProps {
  rank: number;
  pdfData: OriginContentItem;
  handleSimilar: any;
}
const PdfItem: React.FC<PdfItemProps> = ({
  rank = 1,
  pdfData,
  handleSimilar,
}) => {
  // console.log("PdfItem");

  const SECRET_KEY = "PdFintelLiGentdesIgn"; // 替换为你的加密密钥

  // 排序标识
  let rankNum = null;
  switch (rank) {
    case 1:
      rankNum = (
        <span className={classNames([styles.serial, styles.first])}>
          {rank}
        </span>
      );
      break;
    case 2:
      rankNum = (
        <span className={classNames([styles.serial, styles.second])}>
          {rank}
        </span>
      );
      break;
    case 3:
      rankNum = (
        <span className={classNames([styles.serial, styles.third])}>
          {rank}
        </span>
      );
      break;
    default:
      rankNum = <span className={styles.serial}>{rank}</span>;
      break;
  }

  // 查找pdf并跳转
  const handlePDF = async () => {
    const params = {
      fullFileName: pdfData.pdf_name,
      keyword: pdfData.keywords,
    };
    const res: any = await searchPdfUrl(params);
    let searchHits = res.searchHits;
    if (searchHits.length === 0) {
      message.warning("no current document found");
      return;
    }
    const data = res.searchHits[0].content;
    let { pageNum, fileUrl } = data;

    fileUrl =
      process.env.REACT_APP_ENV !== "test"
        ? fileUrl
        : fileUrl.replace(
            "http://192.10.50.67:9000",
            "https://www.aicodeas.com/minio"
          );

    fileUrl = encryptURL(fileUrl, SECRET_KEY);
    // console.log("fileUrl", fileUrl);

    process.env.REACT_APP_ENV !== "test"
      ? window.open(
          `http://192.10.50.67/view/pdf?page=${pageNum}&url=${fileUrl}&auth=${SECRET_KEY}`,
          "_blank"
        )
      : window.open(
          `https://www.aicodeas.com/view/pdf?page=${pageNum}&url=${fileUrl}`,
          "_blank"
        );
  };

  return (
    <div className={styles.PdfItem}>
      <div
        className={classNames("ellipsis", "pointer", "align")}
        onClick={handlePDF}
      >
        {rankNum}
        <span className={styles.title}> {pdfData.book_name}</span>
      </div>

      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{ __html: pdfData.content }}
      ></div>
      <Tag
        color="warning"
        className={classNames(styles.tag, "pointer")}
        onClick={handleSimilar}
      >
        相似条文
      </Tag>
    </div>
  );
};

export default memo(PdfItem);
