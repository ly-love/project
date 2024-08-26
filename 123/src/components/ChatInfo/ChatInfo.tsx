import React, { memo } from "react";
import styles from "./ChatInfo.module.scss";
import classNames from "classnames";
import robotAvatar from "../../assets/images/icon.png";
import { recommendList } from "../../utils/chatData";

const ChatInfo: React.FC = () => {
  // console.log("ChatInfo");
  return (
    <div className={styles.chatInfo}>
      <div className="chatContent">
        <div className={classNames(styles.info, "flex")}>
          <img src={robotAvatar} alt="" />
          <div className={styles.illustrate}>
            <div className={styles.title}>你好，我是规范智能助手</div>
            <p className={styles.prompt}>
              作为你的智能助手，我基于“领域知识图谱+文档搜索引擎+大语言模型”三大关键技术，实现了融合知识图谱、大语言模型的规范高效搜索。
            </p>
            <div className={styles.card}>
              <p className={styles.prompt}>相关推荐：</p>
              <div className={classNames(styles.list, "flex")}>
                {recommendList.map((item) => (
                  <a
                    key={item.id}
                    href={
                      process.env.REACT_APP_ENV !== "test"
                        ? item.insideHref
                        : item.outsideHref
                    }
                    className={styles.item}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="align">
                      {/* <img src={item.imgSrc} alt={item.title} /> */}
                      <span
                        style={{
                          color: `${item.iconColor}`,
                          fontSize: "24px",
                        }}
                        className={classNames(
                          styles.icon,
                          "iconfont",
                          `${item.iconClass}`
                        )}
                      ></span>
                      <div>{item.title}</div>
                    </div>
                    <div className={classNames(styles.txt)}>{item.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInfo);
