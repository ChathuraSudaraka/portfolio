import React, { useRef, useState, useEffect } from "react";

const CircleFollowMouse = () => {
  const circleRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      setIsBouncing(true);

      // After a short delay, stop the bouncing effect
      setTimeout(() => {
        setIsBouncing(false);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      onMouseMove={() => setIsBouncing(true)}
    >
      <div
        ref={circleRef}
        className={`w-5 h-5 bg-blue-500 rounded-full absolute ${
          isBouncing ? "bounce" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
};

export default CircleFollowMouse;
