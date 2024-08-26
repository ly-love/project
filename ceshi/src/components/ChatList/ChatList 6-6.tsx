import React, { memo, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import classNames from "classnames";
import { Avatar, Popover } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./ChatList.module.scss";
import Typewriter from "../Typewriter/Typewriter";
import userAvatar from "../../assets/images/user.png";
import robotAvatar from "../../assets/images/icon.png";
import { updateCopyMsg } from "../../redux/chatSlice";

interface ChatItem {
  from: string;
  to: string;
  content: string[];
}

function ChatList({ chatData = [] }) {
  const chatListRef = useRef<HTMLDivElement>(null);
  const { loading, loadingTxt } = useSelector((state: RootState) => state.chat);

  const dispatch = useDispatch();

  const scrollToBottom = useCallback(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData, scrollToBottom]); // item.from === "mine"滚动条未滚动，所以增加 chatData更新触发scrollToBottom，确保滚动条移动到最新内容的位置

  const handleQuestion = (value: string[]) => {
    dispatch(updateCopyMsg(value[0]));
  };

  return (
    <div className={styles.chatList} ref={chatListRef}>
      {chatData.map((item: ChatItem, index: number) =>
        item.from === "mine" ? (
          <div key={index} className={classNames(styles.question, "flex")}>
            <Avatar className={styles.avatar} src={userAvatar} />
            <Popover
              placement="bottom"
              title=""
              content={
                <div
                  className="pointer"
                  onClick={() => handleQuestion(item.content)}
                >
                  复制内容到输入框
                </div>
              }
              arrow={false}
            >
              <div className={classNames(styles.text, "pointer")}>
                {item.content}
              </div>
            </Popover>
          </div>
        ) : (
          <div key={index} className={classNames(styles.answer, "flex")}>
            <Avatar className={styles.avatar} src={robotAvatar} />
            <div className={styles.text}>
              <Typewriter
                markdownTexts={item.content}
                changeScroll={scrollToBottom}
              />
            </div>
          </div>
        )
      )}
      {loading && (
        <div className={classNames(styles.answer, "align")}>
          <Avatar className={styles.avatar} icon={<LoadingOutlined />} />
          <div className={styles.text}>{loadingTxt}</div>
        </div>
      )}
    </div>
  );
}

export default memo(ChatList);
