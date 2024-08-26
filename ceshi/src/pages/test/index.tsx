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
  const [selectedSubject, setSelectedSubject] = useState("数学");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const allMessages = await db.chats
        .where("subject")
        .equals(selectedSubject)
        .toArray();
      setMessages(allMessages);
    };
    fetchMessages();
  }, [selectedSubject]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    let inputMsg = input.trim();
    if (!inputMsg) {
      return;
    }

    const question: Message = {
      content: input,
      isQuestion: true,
      from: "mine",
      to: "robot",
      subject: selectedSubject,
    };

    const questionId = await db.chats.add(question);

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...question, id: questionId },
    ]);
    setInput("");

    const answerText = `回答：${input}`;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const answer: Message = {
      content: answerText,
      isQuestion: false,
      from: "robot",
      to: "mine",
      subject: selectedSubject,
    };

    const answerId = await db.chats.add(answer);

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...answer, id: answerId },
    ]);

    const processedAnswerText = `**处理结果**：${answerText}\n\n这是一个处理过的结果。`;
    const processedAnswer: ProcessedMessage = {
      originalMessageId: answerId,
      processedText: processedAnswerText,
    };
    await db.processedMessages.add(processedAnswer);

    typeMessage(answerText);
  };

  const typeMessage = (text: string) => {
    let index = 0;
    setTypingMessage("");
    setIsTyping(true);
    setIsPaused(false); // Reset pause state

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    typingIntervalRef.current = setInterval(() => {
      if (index < text.length && !isPaused) {
        setTypingMessage((prev) => prev + text.charAt(index));
        index++;
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        clearInterval(typingIntervalRef.current!);
        setIsTyping(false);
      }
    }, 100);
  };

  const clearCache = async () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    setTypingMessage("");
    setIsTyping(false);
    setIsPaused(false);

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

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
    setMessages([]); // Clear current messages when subject changes
  };

  return (
    <div className="chat-container" style={{ height: '400px', overflowY: 'auto' }}>
      <div className="chat-header">
        <label htmlFor="subject-select">选择专业：</label>
        <select id="subject-select" value={selectedSubject} onChange={handleSubjectChange}>
          <option value="数学">数学</option>
          <option value="英语">英语</option>
        </select>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.isQuestion ? 'question' : 'answer'}>
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
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>发送</button>
        <button onClick={clearCache}>清空缓存</button>
        {isTyping && <button onClick={handlePause}>暂停</button>}
      </div>
    </div>
  );
};

export default Chat;
