import React, { useState, useRef, useEffect, memo } from "react";
import classNames from "classnames";
import styles from "./VoiceInput.module.scss";
import { Button } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { getTextByAudio } from "../../api/chat";

interface VoiceInputProps {
  sendMessage: any;
}
// interface VoiceInputProps {
//   sendAudio: any;
// }

// 语音输入 - 将转换后的文字放到输入框中，可以进行修改，然后再发送
const VoiceInput: React.FC<VoiceInputProps> = ({ sendMessage }) => {
  
// 语音输入 - 将转换后的文字放到输入框中，可以进行修改，然后再发送
// const VoiceInput: React.FC<VoiceInputProps> = ({  sendAudio }) => {

  const [recording, setRecording] = useState(false); // 是否正在录音
  const audioData = useRef<MediaStream | null>(null); // 存储媒体流数据
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // 存储媒体记录器实例
  const chunksRef = useRef<Blob[]>([]); // 存储音频数据块

  useEffect(() => {
    const init = async () => {
      try {
        // 获取用户媒体设备（麦克风）的媒体流
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // 将获取到的媒体流存储到audioData ref中
        audioData.current = stream;
      } catch (error) {
        console.error("Error accessing microphone:", error);
        // 如果获取媒体流失败，打印错误信息
        // 这里可以设置一个错误状态，用于显示给用户
      }
    };

    init();

    // 组件卸载时清理资源
    return () => {
      if (audioData.current) {
        audioData.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  //   开始录音
  const startRecording = () => {
    if (audioData.current) {
      chunksRef.current = []; // 重置chunks数组，用于新的录音
      // 创建一个新的MediaRecorder实例
      mediaRecorderRef.current = new MediaRecorder(audioData.current);
      // 当有数据可用时触发的事件
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data); // 将数据块添加到chunks数组中
        }
      };
      mediaRecorderRef.current.start(); // 开始录音
      setRecording(true); // 更新录音状态为正在录音
    }
  };

  //   停止录音
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop(); // 停止录音
      setRecording(false); // 更新录音状态为未录音

      // 录音停止时触发的事件
      mediaRecorderRef.current.onstop = async () => {
        // 将chunks数组中的数据合并成一个Blob对象
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        const formData = new FormData(); // 创建一个FormData对象，用于上传音频文件
        formData.append("file", blob, "recording.wav");

        const res: any = await getTextByAudio(formData); // 语音转文字
        const data = res.Segments;
        let text = ""; // 从接口中获取文字内容
        data.forEach((item: any) => {
          text += item.text;
        });
        sendMessage(text); // 将转换后的文字发送给后端，不需要显示在输入框，而是直接发送
        // sendAudio(text)  // 将转换后的文字发送给后端，将文字显示在输入框，这样可以修改文字之后，再发送请求
      };
    }
  };

  return (
    <Button
      className={classNames(styles.audioBtn, "center")}
      onClick={recording ? stopRecording : startRecording}
    >
      <AudioOutlined />
      <span> {recording ? "停止录制" : "语音输入"}</span>
    </Button>
  );
};

export default memo(VoiceInput);
