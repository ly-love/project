import React, { useState, useEffect, useRef } from "react";
import { db, Message, ProcessedMessage } from "./db";
import ReactMarkdown from "react-markdown";
import "./index.css";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const allMessages = await db.chats.toArray();
      setMessages(allMessages);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    let inputMsg = input.trim();
    if (!inputMsg) {
      return;
    }

    // 1、存储并显示用户问题
    // 创建一个 question 对象，包含用户输入的文本 (input) 和一个标志 (isQuestion: true)，表示这是一个问题。
    const question: Message = {
      content: input,
      isQuestion: true,
      from: "mine",
      to: "robot",
    };

    // 使用 db.messages.add(question) 将问题存储到 IndexedDB，questionId 是存储后生成的 ID。
    const questionId = await db.chats.add(question);

    // 使用 setMessages 更新组件状态，将新问题添加到消息列表中，显示在界面上。
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...question, id: questionId },
    ]);
    setInput(""); //清空输入框

    // Simulate API call and processing
    // 2、 模拟 API 调用以获取回答。
    // 这里假设 API 返回的回答是 回答：{用户输入}。 使用 setTimeout 模拟 1 秒的延迟，表示 API 响应时间
    const answerText = `回答：${input}`;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 3、存储并显示回答
    // 创建一个 answer 对象，包含 API 返回的回答文本 (answerText) 和一个标志 (isQuestion: false)，表示这是一个回答。
    const answer: Message = {
      content: answerText,
      isQuestion: false,
      from: "robot",
      to: "mine",
    };

    // 使用 db.messages.add(answer) 将回答存储到 IndexedDB，answerId 是存储后生成的 ID。
    const answerId = await db.chats.add(answer);

    // 使用 setMessages 更新组件状态，将新回答添加到消息列表中，显示在界面上。
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...answer, id: answerId },
    ]);

    // 4、存储处理后的答案
    // 创建一个 processedAnswerText，包含对答案的进一步处理结果，使用 Markdown 格式。
    const processedAnswerText = `**处理结果**：${answerText}\n\n这是一个处理过的结果。`;
    // 创建一个 processedAnswer 对象，包含原始回答的 ID (originalMessageId: answerId) 和处理后的文本 (processedText: processedAnswerText)。
    const processedAnswer: ProcessedMessage = {
      originalMessageId: answerId,
      processedText: processedAnswerText,
    };
    // 使用 db.processedMessages.add(processedAnswer) 将处理后的答案存储到 processedMessages 表中。
    await db.processedMessages.add(processedAnswer);

    // 5、逐字显示回答
    // Typing effect
    typeMessage(answerText);
  };

  const typeMessage = (text: string) => {
    let index = 0;
    setTypingMessage("");
    setIsTyping(true);
    setIsPaused(false);

    typingIntervalRef.current = setInterval(() => {
      if (index < text.length && !isPaused) {
        setTypingMessage((prev) => prev + text.charAt(index));
        index++;
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (isPaused) {
        clearInterval(typingIntervalRef.current!);
        setIsTyping(false);
      } else if (index >= text.length) {
        clearInterval(typingIntervalRef.current!);
        setIsTyping(false);
      }
    }, 100);
  };

  const clearCache = async () => {
    await db.chats.clear();
    await db.processedMessages.clear();
    setMessages([]);
  };

  const handlePause = () => {
    setIsPaused(true);
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      setIsTyping(false);
    }
  };

  return (
    <div
      className="chat-container"
      style={{ height: "400px", overflowY: "auto" }}
    >
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.isQuestion ? "question" : "answer"}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {typingMessage && (
          <div className="answer">
            <ReactMarkdown>{typingMessage}</ReactMarkdown>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>发送</button>
        <button onClick={clearCache}>清空缓存</button>
        {isTyping && <button onClick={handlePause}>暂停</button>}
      </div>
    </div>
  );
};

export default Chat;
