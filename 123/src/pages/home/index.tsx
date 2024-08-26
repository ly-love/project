import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import type { RootState } from "../../redux/store";
import styles from "./index.module.scss";
import Recommend from "../../components/Recommend/Recommend";
import ChatList from "../../components/ChatList/ChatList";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import SelectMajor from "../../components/SelectMajor/SelectMajor";
import PdfList from "../../components/PdfList/PdfList";
import { useParams } from "react-router-dom";
import { changeMarjor } from "../../redux/settingsSlice";
import ChatInfo from "../../components/ChatInfo/ChatInfo";
import DevelopMembers from "../../components/DevelopMembers/DevelopMembers";

const Home: React.FC = () => {
  const { id = "all_major" } = useParams<{ id?: string }>(); // 明确类型
  const { marjor } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== marjor) {
      dispatch(changeMarjor(id));
    }
  }, [dispatch, id, marjor]); // 依赖项数组，确保当 id 或 marjor 更改时执行此 effect

  const { chatList, originList } = useSelector(
    (state: RootState) => state.chat
  );
  const { memoryList } = useSelector((state: RootState) => state.memory);

  const chatData = chatList[id] || [];
  const originData = originList[id] || {};
  const memoryData = memoryList[id] || [];

  return (
    <section className={classNames(styles.home, "flex")}>
      <div className={classNames(styles.chatContainer, "column")}>
        <SelectMajor id={id} />

        {chatData.length === 0 ? (
          <ChatInfo />
        ) : (
          <ChatList chatData={chatData} />
        )}
        <ChatMessage memoryData={memoryData} />
        <DevelopMembers />
      </div>
      <div className={styles.articleContainer}>
        {originData.content ? (
          <PdfList originData={originData} />
        ) : (
          <Recommend />
        )}
      </div>
    </section>
  );
};

export default Home;
