import React, { memo } from "react";
import classNames from "classnames";
import { Button, Tag } from "antd";
import styles from "./ExampleList.module.scss";

interface ExampleListProps {
  extractData: {
    id: string;
    title: string;
    catalog: string;
    txt: string;
  };
  handleDetail: () => void;
  handleTest: () => void;
}

const ExampleList: React.FC<ExampleListProps> = ({
  extractData,
  handleDetail,
  handleTest,
}) => {
  return (
    <div className={styles.item}>
      <div className={classNames(styles.topic, "space")}>
        <span>{extractData.title}</span>
        <Button type="link" onClick={handleDetail}>
          详情
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.catalog}>{extractData.catalog}</div>
        <div className={styles.txt}>{extractData.txt}</div>
      </div>
      <Tag color="warning" onClick={handleTest} className="pointer">
        试一试
      </Tag>
    </div>
  );
};

export default memo(ExampleList);
