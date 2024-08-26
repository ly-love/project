import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { useLocation, NavLink } from "react-router-dom";
import {
  ArrowLeftOutlined,
  SendOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Input, Avatar, message } from "antd";
import robotAvatar from "../../assets/images/icon.png";
import { getExtract } from "../../api/extract";

const { TextArea } = Input;

const Doc: React.FC = () => {
  const location = useLocation();
  const initialData = (location.state as { [key: string]: string }) || {};

  const [msg, setMsg] = useState(""); // 发送的信息
  const messageRef = useRef<HTMLDivElement>(null);
  const [extractData, setExtractData] = useState<
    string | { [key: string]: string }
  >(initialData);  // 抽取的数据

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    messageRef.current!.focus();
  }, [messageRef]);

  // 发送消息
  const sendMessage = async () => {
    const question = msg.trim();
    if (!question) {
      message.warning({
        content: "你没有输入问题呢",
        key: "prompt",
      });
      messageRef.current!.focus();
      return;
    }
    setLoading(true);
    setMsg("");
    messageRef.current!.focus();
    const res: any = await getExtract({ text: question });
    setLoading(false);
    setExtractData(res);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.ctrlKey) {
      e.preventDefault();
      sendMessage();
    } else if (e.key === "Enter" && e.ctrlKey) {
      setMsg(msg + "\n");
    }
  };

  return (
    <section className={styles.docContainer}>
      <div className={styles.back}>
        <NavLink to="/extract">
          <Button type="link" icon={<ArrowLeftOutlined />}>
            返回
          </Button>
        </NavLink>
      </div>
      <div className={classNames(styles.doc, "column")}>
        <div className={styles.infoContainer}>
          {loading ? (
            <div className={classNames(styles.info, "flex")}>
              <Avatar
                className={styles.avatar}
                size={32}
                style={{ backgroundColor: "#5b95f0" }}
                icon={<LoadingOutlined />}
              />
              <div className={styles.text}>正在抽取文本信息 ...</div>
            </div>
          ) : (
            <div className={classNames(styles.info, "flex")}>
              <Avatar className={styles.avatar} src={robotAvatar} />
              <div className={styles.list}>
                {typeof extractData === "string" ? (
                  <pre className={styles.item}>{extractData}</pre>
                ) : (
                  <>
                    <div className={styles.title}>抽取的信息如下：</div>
                    <div className={styles.items}>
                      {Object.entries(extractData).map(([key, value]) => (
                        <div key={key} className={styles.item}>
                          <span className={styles.dot}> • </span>
                          <span className={styles.txt}>
                            {key} : {value}
                          </span>
                          <span className={styles.semicolon}> ; </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={classNames(styles.extractChatArea, "flex")}>
          <TextArea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="输入要抽取的文本内容（ctrl+enter换行，enter发送）"
            className={styles.textarea}
            autoSize={{ minRows: 3, maxRows: 5 }}
            ref={messageRef}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="primary"
            shape="circle"
            className={classNames(styles.btn)}
            onClick={sendMessage}
            icon={
              <SendOutlined
                rotate={-45}
                style={{ paddingLeft: "2px", paddingBottom: "2px" }}
              />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Doc;
