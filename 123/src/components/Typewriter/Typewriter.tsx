import React, { memo, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import stringWidth from "string-width";

interface TypewriterProps {
  markdownTexts: string[]; // 属性是一个字符串数组
  changeScroll: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  markdownTexts,
  changeScroll,
}) => {
  const [displayText, setDisplayText] = useState("");

  // useEffect(() => {
  //   let index = 0;
  //   const timer = setInterval(() => {
  //     if (index < markdownTexts.length - 1) {
  //       setDisplayText((pre) => pre + markdownTexts[index]);
  //       index++;
  //       changeScroll();
  //     } else {
  //       clearInterval(timer);
  //     }
  //   }, 50);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [changeScroll, markdownTexts]); // 当markdownTexts或currentIndex变化时，重新执行effect

  useEffect(() => {
    let currentIndex = 0;
    const displayNext = () => {
      if (currentIndex < markdownTexts.length - 1) {
        setDisplayText((prev) => prev + markdownTexts[currentIndex]);
        currentIndex++;
        changeScroll();
        setTimeout(displayNext, 50); // 每个元素间隔50毫秒显示
      }
    };

    displayNext();

    return () => {
      currentIndex = markdownTexts.length; // 清除未完成的 timeout
    };
  }, [changeScroll, markdownTexts]);

  return (
    <div className="markdown" style={{ overflow: "auto" }}>
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { stringLength: stringWidth }]]}
      >
        {displayText}
      </ReactMarkdown>
    </div>
  );
};

export default memo(Typewriter);
