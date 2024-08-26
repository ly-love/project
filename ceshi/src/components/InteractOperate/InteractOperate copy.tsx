import React, { memo, useCallback, useRef, useState } from "react";
import styles from "./InteractOperate.module.scss";
import classNames from "classnames";
import { Button, Tooltip, message } from "antd";
import { CopyOutlined, SoundOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { getMp3AudioByText } from "../../api/chat";
import debounce from "../../utils/debounce";

interface InteractOperateProps {
  content: string;
  stopCurrentAudio: () => void;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
}

const InteractOperate: React.FC<InteractOperateProps> = ({
  content = "",
  stopCurrentAudio,
  setCurrentAudio,
}) => {
  // 当前发送的请求
  const [currentRequestContent, setCurrentRequestContent] = useState<
    string | null
  >(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const playMp3Audio = useCallback(async () => {
    if (currentRequestContent == content) {
      // 如果当前请求的内容与点击的内容相同，则不重复请求
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // 取消之前的请求
    }
    abortControllerRef.current = new AbortController(); // 创建新的AbortController
    setCurrentRequestContent(content); // 更新当前请求的内容

    try {
      stopCurrentAudio(); // 暂停正在播放的音频
      const response: any = await getMp3AudioByText(
        { text: content },
        abortControllerRef.current.signal
      );

      const blob = new Blob([response], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio
        .play()
        .catch((playError) => console.error("无法播放音频", playError));
      setCurrentAudio(audio);
      audio.addEventListener("ended", () => setCurrentAudio(null));
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    } finally {
      if (content === currentRequestContent) {
        setCurrentRequestContent(null); // 清除当前请求内容状态
      }
    }
  }, [content, stopCurrentAudio, setCurrentAudio, currentRequestContent]);

  // 复制文本
  const copyAnswerToClipboard = useCallback(() => {
    copy(content);
    message.success("已复制！");
  }, [content]);

  // // 发送请求前取消之前的请求+防抖一起使用
  // const playMp3Audio = useCallback(
  //   debounce(async () => {
  //     if (abortControllerRef.current) {
  //       abortControllerRef.current.abort(); // 取消之前的请求
  //     }
  //     abortControllerRef.current = new AbortController(); // 创建新的AbortController

  //     try {
  //       stopCurrentAudio(); // 暂停正在播放的音频
  //       const response: any = await getMp3AudioByText(
  //         { text: content },
  //         abortControllerRef.current.signal
  //       );

  //       const blob = new Blob([response], { type: "audio/mp3" }); // 将返回的数据转化为Blob
  //       const url = URL.createObjectURL(blob);

  //       const audio = new Audio(url); // 创建一个新的audio元素来播放mp3文件

  //       // 尝试播放音频，并捕获可能发生的错误
  //       audio.play().catch((playError) => {
  //         console.error("无法播放音频", playError);
  //         return;
  //       });

  //       setCurrentAudio(audio); // 更新当前音频元素状态

  //       // 添加'ended'事件监听器，当音频播放结束时调用handleAudioEnded
  //       audio.addEventListener("ended", () => setCurrentAudio(null));
  //     } catch (error: any) {
  //       if (error.name !== "AbortError") {
  //         console.error(error);
  //       }
  //     }
  //   }, 500),
  //   [content, stopCurrentAudio, setCurrentAudio]
  // );

  // 播放音频 - 使用防抖
  // const playMp3Audio = useCallback(
  //   debounce(async () => {
  //     try {
  //       stopCurrentAudio(); // 暂停正在播放的音频
  //       const response: any = await getMp3AudioByText({ text: content });

  //       const blob = new Blob([response], { type: "audio/mp3" }); // 将返回的数据转化为Blob
  //       const url = URL.createObjectURL(blob);

  //       const audio = new Audio(url); // 创建一个新的audio元素来播放mp3文件

  //       // 尝试播放音频，并捕获可能发生的错误
  //       audio.play().catch((playError) => {
  //         console.error("无法播放音频", playError);
  //         return;
  //       });

  //       setCurrentAudio(audio); // 更新当前音频元素状态

  //       // 添加'ended'事件监听器，当音频播放结束时调用handleAudioEnded
  //       audio.addEventListener("ended", () => setCurrentAudio(null));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }, 1000),
  //   [content, stopCurrentAudio, setCurrentAudio]
  // );

  return (
    <div className={classNames(styles.interact, "flex")}>
      <Tooltip title="播放文本" color="#1677ff">
        <Button
          shape="round"
          size="small"
          className={styles.soundBtn}
          icon={<SoundOutlined style={{ fontSize: "14px" }} />}
          onClick={playMp3Audio}
        />
      </Tooltip>
      <Tooltip title="复制" color="#1677ff">
        <Button
          shape="round"
          size="small"
          icon={<CopyOutlined style={{ fontSize: "14px" }} />}
          onClick={copyAnswerToClipboard}
        />
      </Tooltip>


    </div>
  );
};

export default memo(InteractOperate);
