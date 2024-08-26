import React, { memo } from "react";
import classNames from "classnames";
import styles from "./Recommend.module.scss";
import qrCodeSrc from "../../assets/images/Qrcode.png";
import { recommendList } from "../../utils/chatData";

function Recommend() {
  // console.log("Recommend");
  return (
    <div className={classNames(styles.recommend, "column")}>
      <div className={styles.catalog}>
        推荐
        <span className={styles.tag}>花园</span>
      </div>

      <div className={styles.grid}>
        {recommendList.map((item) => (
          <a
            key={item.id}
            href={
              process.env.REACT_APP_ENV !== "test"
                ? item.insideHref
                : item.outsideHref
            }
            className={classNames(styles.card, "align")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src={item.imgSrc} alt={item.title} className={styles.img} /> */}
            <span
              style={{
                color: `${item.iconColor}`,
                fontSize: "28px",
              }}
              className={classNames(
                styles.icon,
                "iconfont",
                `${item.iconClass}`
              )}
            ></span>
            <div className={styles.info}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.desc}>{item.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <div className={classNames(styles.code, "space")}>
        <div className={styles.info}>
          <div className={styles.title}>扫码加入用户反馈群 </div>
          <div className={styles.desc}>规范智能助手之家 </div>
        </div>
        <img src={qrCodeSrc} alt="扫码进群" className={styles.img} />
      </div>
    </div>
  );
}

export default memo(Recommend);
