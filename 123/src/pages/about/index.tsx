import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import qrCodeSrc from "../../assets/images/Qrcode.png";
import { recommendList } from "../../utils/chatData";

const About: React.FC = () => {
  return (
    <section className={classNames(styles.about)}>
      <div className={classNames(styles.headline)}>
        <h2 className={classNames(styles.title)}>
          陆路交通基础设施智能化设计共性关键技术
        </h2>
        <span className={classNames(styles.desc)}>国家重点研发项目</span>
      </div>

      <div className={classNames(styles.content, "space")}>
        <div className={styles.intro}>
          <h3 className={styles.theme}>● 精准、全面、高效、多维</h3>
          <p className={styles.goal}>
            为践行 “ 科研服务生产，AI赋能业务 ”
            宗旨，依托国家重点研发项目“陆路交通基础设施智能化设计共性关键技术”，项目组研发了规范智能助手，软件基于“领域知识图谱+文档搜索引擎+大语言模型”三大关键技术，实现融合知识图谱、大语言模型的规范高效搜索，基于pdf文档的领域知识图谱构建维护，一定程度上解决传统知识检索“隔靴搔痒”痛点，加速了知识图谱和大语言模型等智能技术在勘察设计行业应用落地。目前软件实现规范内容生成、图谱联动展示和全文检索功能；软件采用B/S架构，可采用链接形式接入各个应用系统。软件目前处于测试阶段，V1.0版主要实现路桥隧常用规范的检索，V2.0将陆续推广至其它专业。欢迎大家试用，提出宝贵的意见和建议（软件界面右侧有用户交流群，扫码进群留下您宝贵的建议，方便精准服务）
          </p>
        </div>
        <div className={styles.banner}></div>
      </div>

      <div className={`space-between ${styles.grid}`}>
        <div className={styles.copyright}>
          <h3 className={styles.title}>智能设计</h3>
          <div className={styles.txt}>© {new Date().getFullYear()}</div>
          <div className={styles.txt}>All rights</div>
        </div>
        <div className={styles.members}>
          <h3 className={styles.title}>关于我们</h3>
          <div className={styles.member}>项目负责人：柏华军、陈瓴</div>
          <div className={styles.member}>
            技术研究：柏华军(桥梁)、谢浩(路基)、吴佳明(隧道) 等
          </div>
          <div className={styles.member}>
            技术支持： 陈瓴、刘燕 、夏杰、蒲建伟
          </div>
        </div>
        <div className={styles.recommend}>
          <h2 className={styles.title}>推荐</h2>
          {recommendList.map((item) => (
            <a
              href={
                process.env.REACT_APP_ENV !== "test"
                  ? item.insideHref
                  : item.outsideHref
              }
              key={item.id}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className={styles.qrCode}>
          <h3 className={styles.title}>帮助</h3>
          <img
            src={qrCodeSrc}
            alt="扫码进群"
            className={styles.codeImg}
            width={100}
            height={100}
          />
          <div className={styles.txt}>扫码进群，了解更多功能！</div>
        </div>
      </div>
    </section>
  );
};

export default About;
