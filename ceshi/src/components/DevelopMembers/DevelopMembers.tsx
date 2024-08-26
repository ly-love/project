import React, { memo } from "react";
import styles from "./DevelopMembers.module.scss";

const DevelopMembers: React.FC = () => {
  return (
    <div className={styles.DevelopMembers}>
      <div className="chatContent">
        <span className={styles.member} >项目负责人：柏华军、陈瓴</span>
        <span className={styles.member}>技术研究：柏华军(桥梁)、谢浩(路基)、吴佳明(隧道) 等</span>
        <span className={styles.member}>技术支持： 陈瓴、刘燕 、夏杰、蒲建伟</span>
      </div>
    </div>
  );
};

export default memo(DevelopMembers);
