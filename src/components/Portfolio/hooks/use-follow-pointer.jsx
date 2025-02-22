import React, { useRef, useState, useEffect } from "react";

const CircleFollowMouse = () => {
  const circleRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isBouncing, setIsBouncing] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device has touch capability
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) return; // Don't add listeners for touch devices

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      setIsBouncing(true);

      setTimeout(() => {
        setIsBouncing(false);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      onMouseMove={() => setIsBouncing(true)}
    >
      {/* Main circle */}
      <div
        ref={circleRef}
        className={`
          absolute -translate-x-1/2 -translate-y-1/2
          w-6 h-6 rounded-full
          bg-gradient-to-r from-violet-600 to-indigo-600
          shadow-lg shadow-violet-500/50
          opacity-75 mix-blend-screen
          ${isBouncing ? 'scale-150 transition-transform duration-200' : 'scale-100'}
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Trailing effect circles */}
      <div
        className={`
          absolute -translate-x-1/2 -translate-y-1/2
          w-3 h-3 rounded-full
          bg-gradient-to-r from-violet-400 to-fuchsia-400
          blur-sm
          opacity-50
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.3s ease-out',
        }}
      />
      <div
        className={`
          absolute -translate-x-1/2 -translate-y-1/2
          w-2 h-2 rounded-full
          bg-violet-300
          blur-sm
          opacity-30
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.4s ease-out',
        }}
      />
    </div>
  );
};

export default CircleFollowMouse;
