import React, { memo, useState } from "react";
import { Modal } from "antd";
import styles from "./UpdateContent.module.scss";
import qrCodeSrc from "../../assets/images/Qrcode.png";

const UpdateContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const updataList = [
    {
      id: "update",
      title: "v1.0.1 版本更新内容如下：",
      points: [
        {
          id: "1",
          content: "1、存储聊天记录",
        },
        {
          id: "2",
          content: "说明：由于目前存储聊天记录数据有限，只能存储少量，超出报错时，请先清空聊天记录字再进行问答",
        },
      ],
    },
  ];

  const UpcomingList = [
    {
      id: "willUpdate",
      title: "v1.0.2 版本将新增如下功能：",
      points: [
        {
          id: "1",
          content: "1、存储更多聊天记录",
        },
        {
          id: "2",
          content: "2、应用程序下载",
        },
      ],
    },
  ];

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="更新内容"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ top: 100 }}
      footer={null}
    >
      {updataList.map((item) => (
        <div key={item.id} className={styles.updateContent}>
          <p className={styles.title}>{item.title}</p>
          {item.points.map((point) => (
            <div key={point.id} className={styles.points}>
              {point.content}
            </div>
          ))}
        </div>
      ))}

      {UpcomingList.map((item) => (
        <div key={item.id} className={styles.updateContent}>
          <p className={styles.title}>{item.title}</p>
          {item.points.map((point) => (
            <div key={point.id} className={styles.points}>
              {point.content}
            </div>
          ))}
        </div>
      ))}

      <div className={styles.qrCode}>
        <div className={styles.title}>扫码入群，解锁隐藏功能！</div>
        <img src={qrCodeSrc} alt="扫码进群" className={styles.img} />
      </div>
    </Modal>
  );
};

export default memo(UpdateContent);
