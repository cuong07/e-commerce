 // TypingText.tsx
"use client";

import React, { useState, useEffect } from "react";

interface ITypingTextProps {
  text: string;
  className?: string;
}

const TypingText: React.FC<ITypingTextProps> = ({
  text,
  className,
  ...props
}: ITypingTextProps) => {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => prevText + text[index]);
      index++;
      if (index === text.length - 1) {
        clearInterval(intervalId);
      }
    }, 50); 
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span className={className} {...props}>
      {currentText}
    </span>
  );
};

export default TypingText;
