import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import Recommend from "../../components/Recommend/Recommend";

const Building: React.FC = () => {
  return (
    <section className={classNames(styles.building, "flex")}>
      <div className={classNames(styles.info, "column")}>
        <div className={styles.title}>正在建设中...</div>
        <div className={styles.desc}>没有专业数据，无法进行问答</div>
        <div className={styles.desc}>
          如需增加专业数据，请使用企业微信扫码进群咨询
        </div>
        <img src="https://www.aicodeas.com/file/img/Qrcode.png" alt="" />
      </div>
      <div className={classNames(styles.recommendContainer)}>
        <Recommend />
      </div>
    </section>
  );
};

export default Building;
