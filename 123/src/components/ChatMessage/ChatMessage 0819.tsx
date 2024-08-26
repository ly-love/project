import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./ChatMessage.module.scss";
import { Button, Input, Modal, message } from "antd";
import {
  ExclamationCircleFilled,
  SendOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLoading,
  addChatList,
  changeOriginList,
  clearChatList,
  clearOriginList,
  changeLoadingTxt,
} from "../../redux/chatSlice";
import { getVectorSearch, getGLM4Stream } from "../../api/chat";
import { addMemoryList, clearMemoryList } from "../../redux/memorySlice";
import { pdfToGLM } from "../../utils/tool";
import { promptData } from "../../lib/prompt";
import VoiceInput from "../VoiceInput/VoiceInput";

const { TextArea } = Input;

function ChatMessage({ memoryData }: { memoryData: [] }) {
  // console.log("ChatMessage");
  const [msg, setMsg] = useState(""); // 发送的信息
  const messageRef = useRef<HTMLDivElement>(null);
  const [modal, contextHolder] = Modal.useModal(); // 清除记忆弹窗

  const { marjor, promote_length, top_p, temperature, model } = useSelector(
    (state: RootState) => state.settings
  );
  const { copyMsg } = useSelector((state: RootState) => state.chat); // 获取复制到输入框的内容

  const dispatch = useDispatch();

  useEffect(() => {
    messageRef.current!.focus();
  }, [messageRef]);

  useEffect(() => {
    if (!copyMsg) {
      return;
    }
    setMsg(copyMsg);
  }, [copyMsg]);

  // 将输入的问题发送给后端
  const sendMessage = useCallback(
    async (question: string) => {
      const chatObj = {
        from: "mine",
        to: "robot",
        content: [question],
      };
      dispatch(addChatList({ key: marjor, value: chatObj })); // 更新聊天列表
      dispatch(changeLoading(true));

      try {
        //  memoryData存储的是将回答的结果的数据
        if (memoryData.length === 0) {
          const params = {
            marjor,
            question,
            promote_length,
            top_p,
            temperature,
            model,
          };
          let pdfData: any = await getVectorSearch(params);
          // 存储pdf原文和知识图谱数据，pdf原文和知识图谱数据都是通过处理originList来显示的
          dispatch(
            changeOriginList({
              key: marjor,
              value: { question, content: pdfData },
            })
          );
          // 将问题进行拼接
          question = pdfToGLM(pdfData, question);
          dispatch(changeLoadingTxt("联想到了相关条文，正在思考中......"));
        } else {
          dispatch(changeLoadingTxt("正在努力思考这个问题..."));
        }

        const userObj = {
          role: "user",
          content: question,
        };

        let glmParams = {
          messages: [promptData, ...memoryData, userObj],
        };

        dispatch(
          addMemoryList({
            key: marjor,
            value: userObj,
          })
        );

        //  GLM4接口
        // const glmData: any = await getGLM4(glmParams);
        // dispatch(changeMemory(glmData));
        // const robotObj = {
        //   from: "robot",
        //   to: "mine",
        //   content: glmData.content,
        // };
        //  GLM4流式接口
        const glmStreamData: any = await getGLM4Stream(glmParams);
        dispatch(
          addMemoryList({
            key: marjor,
            value: {
              content: glmStreamData.answer.join(""),
              role: "assistant",
              tool_calls: null,
            },
          })
        );

        // console.log(memoryData, "memoryData");
        const robotObj = {
          from: "robot",
          to: "mine",
          content: glmStreamData.answer,
        };
        dispatch(addChatList({ key: marjor, value: robotObj })); // 更新聊天列表
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(changeLoading(false));
      }
    },
    [dispatch, marjor, memoryData, model, promote_length, temperature, top_p]
  );

  // 发送消息
  const handleMessage = useCallback(async () => {
    let question = msg.trim();
    if (!question) {
      message.warning({
        content: "你没有输入问题呢",
        key: "prompt",
      });
      messageRef.current!.focus();
      return;
    }
    sendMessage(question);
    setMsg(""); // 清空输入框内容
    messageRef.current!.focus(); // 输入框聚焦
  }, [msg, sendMessage]);

  // 语音转文字后，文字显示在输入框中
  // const sendAudio = (text: string) => {
  //   setMsg(text);
  // };

  // ctrl+enter换行，enter发送
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.key === "Enter" && !e.ctrlKey) {
        e.preventDefault();
        handleMessage();
      } else if (e.key === "Enter" && e.ctrlKey) {
        setMsg(msg + "\n");
      }
    },
    [msg, handleMessage]
  );

  // 清除记忆
  const handleClear = useCallback(async () => {
    modal.confirm({
      title: "确定清除记忆？",
      icon: <ExclamationCircleFilled />,
      content: "清除后需重新进行多轮问答，请谨慎操作",
      centered: true,
      maskClosable: true,
      onOk() {
        dispatch(clearChatList({ key: marjor, value: [] }));
        dispatch(clearOriginList({ key: marjor, value: {} }));
        dispatch(clearMemoryList({ key: marjor, value: [] }));
      },
      onCancel() {},
    });
  }, [dispatch, marjor, modal]);

  return (
    <div className={classNames(styles.chatMessage)}>
      <div className="chatContent">
        <div className={classNames(styles.chatBtns, "flex")}>
          {/* 语音输入 - 直接发送语音转换之后的文字给后端 */}
          <VoiceInput sendMessage={sendMessage} />
          {/* 语音输入 - 将转换后的文字放到输入框中，可以进行修改，然后再发送 */}
          {/* <VoiceInput sendAudio={sendAudio} /> */}

          {/* 清除记忆 */}
          <Button
            className={classNames(styles.clearBtn, "center")}
            onClick={handleClear}
          >
            <ClearOutlined />
            <span>清除记忆</span>
          </Button>
          {contextHolder}
        </div>

        <div className={classNames(styles.chatTextArea, "flex")}>
          <TextArea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="输入您的问题或需求（ctrl+enter换行，enter发送）"
            className={styles.textarea}
            autoSize={{ minRows: 3, maxRows: 5 }}
            ref={messageRef}
            onKeyDown={handleKeyDown}
          />

          <Button
            type="primary"
            shape="circle"
            className={classNames(styles.btn)}
            onClick={handleMessage}
            icon={
              <SendOutlined
                rotate={-45}
                style={{ paddingLeft: "2px", paddingBottom: "2px" }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ChatMessage);
