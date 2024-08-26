import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import stringWidth from "string-width";

import InteractOperate from "../InteractOperate/InteractOperate";

interface ChatItem {
  from: string;
  to: string;
  content: string[];
}
interface ChatListProps {
  chatData: ChatItem[];
}

function ChatList({ chatData = [] }: ChatListProps) {
  const chatListRef = useRef<HTMLDivElement>(null); // 聊天窗口
  const { loading, loadingTxt } = useSelector((state: RootState) => state.chat);
  const oldChatDataRef = useRef<ChatItem[]>([]); // 使用 useRef 来存储旧的聊天记录数组
  const [shouldUseTypewriter, setShouldUseTypewriter] =
    useState<boolean>(false); // 是否显示typewriter
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  ); // 当前播放的音频元素状态
  const dispatch = useDispatch();
  const scrollToBottom = useCallback(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatData, scrollToBottom]); // item.from === "mine"滚动条未滚动，所以增加 chatData更新触发scrollToBottom，确保滚动条移动到最新内容的位置
  // 通过刚开始获取的chatData和新的chatData对比来判断，最新的消息使用打字机效果

  useEffect(() => {
    const len = chatData.length;
    const oldLen = oldChatDataRef.current.length;
    const item = chatData[len - 1];
    if (item?.from !== "mine" && len > oldLen) {
      setShouldUseTypewriter(true);
    } else {
      setShouldUseTypewriter(false);
    }
    oldChatDataRef.current = chatData; // 更新旧的聊天记录数组
  }, [chatData]);

  // 复制内容到输入框
  const copyQuestion = (value: string[]) => {
    dispatch(updateCopyMsg(value[0]));
  };

  // 停止播放
  const stopCurrentAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause(); // 如果当前有正在播放的音频，暂停音频
      currentAudio.currentTime = 0; // 重置音频的当前播放时间
    }
    setCurrentAudio(null); // 清除当前音频元素的状态
  }, [currentAudio]);

  return (
    <div className={styles.chatList} ref={chatListRef}>
      <div className="chatContent">
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
                    onClick={() => copyQuestion(item.content)}
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
            <div key={index} className={classNames(styles.answer, "column")}>
              <div className="flex">
                <Avatar className={styles.avatar} src={robotAvatar} />
                <div className={styles.text}>
                  {shouldUseTypewriter && index === chatData.length - 1 ? (
                    <Typewriter
                      markdownTexts={item.content}
                      changeScroll={scrollToBottom}
                    />
                  ) : (
                    <div className="markdown">
                      <ReactMarkdown
                        remarkPlugins={[
                          [remarkGfm, { stringLength: stringWidth }],
                        ]}
                      >
                        {item.content.join("")}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
              <InteractOperate
                content={item.content.join("")}
                stopCurrentAudio={stopCurrentAudio}
                setCurrentAudio={setCurrentAudio}
              />
            </div>
          )
        )}
        {loading && (
          <div className={classNames(styles.answer, "align")}>
            <Avatar
              className={styles.avatar}
              style={{ backgroundColor: "#5b95f0" }}
              icon={<LoadingOutlined />}
            />
            <div className={styles.text}>{loadingTxt}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ChatList);
