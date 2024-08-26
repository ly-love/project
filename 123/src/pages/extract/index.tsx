import React, { useState, useRef } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ExampleList from "../../components/ExtractList/ExampleList";
import { getExtract } from "../../api/extract";
import { extractList } from "../../utils/extractData";
import exampleOne from "../../lib/exampleOne";
import exampleTwo from "../../lib/exampleTwo";
import exampleThree from "../../lib/exampleThree";

const Extract: React.FC = () => {
  const [isClickAllowed, setIsClickAllowed] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const [spinning, setSpinning] = React.useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // 详情
  const handleDetail = (id: string, title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
    switch (id) {
      case "one":
        setModalContent(exampleOne);
        break;
      case "two":
        setModalContent(exampleTwo);
        break;
      default:
        setModalContent(exampleThree);
        break;
    }
  };
  // 试一试
  const handleTest = async () => {
    setSpinning(true);
    const res: any = await getExtract({ text: exampleOne });
    setSpinning(false);
    navigate("/extract/doc", { state: res });
  };

  // 点击div触发input点击事件
  const handleClick = () => {
    if (isClickAllowed && inputRef.current) {
      inputRef.current.click(); // 手动触发input的点击事件
      setIsClickAllowed(false); // 用户点击后，不允许立即再次点击
    }
  };
  const handleMouseUp = () => {
    setIsClickAllowed(true); // 当鼠标抬起时，允许下次点击
  };
  //上传文件
  const uploadFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return; // 处理上传文件之后再次点击上传文件并取消时会报错
    setSpinning(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const res: any = await getExtract({ text: reader.result });
      setSpinning(false);
      navigate("/extract/doc", { state: res });
    };
    reader.onerror = () => {
      if (reader.error) {
        console.log(reader.error, "error");
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className={styles.extract}>
      <div className={styles.info}>
        <div className={styles.title}>设计信息抽取</div>
        <p>
          通过分析用户上传的设计说明文档，帮助用户提取设计说明中的信息，所需要提取的信息可以定制。
        </p>
      </div>

      <div className={classNames(styles.card, "flex")}>
        {extractList.map((item) => (
          <ExampleList
            extractData={item}
            key={item.id}
            handleDetail={() => handleDetail(item.id, item.title)}
            handleTest={handleTest}
          />
        ))}
      </div>

      <div
        className={classNames(styles.upload, "center")}
        onClick={handleClick}
        onMouseUp={handleMouseUp}
      >
        {/* <img src={extractSrc} className={styles.icon} alt="" /> */}
        <span
          style={{
            color: "#2d83ff",
            fontSize: "48px",
          }}
          className={classNames(styles.icon, "iconfont icon-shangchuanwendang")}
        ></span>
        <label htmlFor="file-input">点击上传 .txt 文件进行信息抽取</label>
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept=".txt"
          onChange={uploadFile}
          style={{ display: "none" }}
        />
      </div>

      {/* {spinning && ( 
      <div className={classNames(styles.spin, "center")}>
        <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} />
        <div>抽取文本信息中，请稍等...</div>
      </div>
       )}  */}

      <Spin
        spinning={spinning}
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
        }
        fullscreen
        tip="正在抽取文本信息..."
      />

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width="70%"
        centered
        footer={false}
      >
        <pre className={styles.exampleContent}>{modalContent}</pre>
      </Modal>
    </section>
  );
};

export default Extract;
