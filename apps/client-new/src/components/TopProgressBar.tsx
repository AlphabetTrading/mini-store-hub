"use client";
import { useEffect, useState } from "react";

const TopProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 600);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        backgroundColor: "#F2F2F2",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "red",
          transition: "width 0.5s ease-in-out",
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
};

export default TopProgressBar;
