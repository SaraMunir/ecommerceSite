import React, { useState, useRef, useEffect } from "react";
// import "./Tooltip.css";

function ToolTip({ children, text, position = "top" }: { children: React.ReactNode; text: string; position?: "top" | "bottom" | "left" | "right" }) {
    const [visible, setVisible] = useState(false);
    const [adjustedPosition, setAdjustedPosition] = useState(position);
    const tooltipRef = useRef<HTMLDivElement>(null);
      useEffect(() => {
    if (visible && tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;

      let newPosition = position;

      if (tooltipRect.left < 0) {
        newPosition = "right";
      } else if (tooltipRect.right > innerWidth) {
        newPosition = "left";
      } else if (tooltipRect.top < 0) {
        newPosition = "bottom";
      } else if (tooltipRect.bottom > innerHeight) {
        newPosition = "top";
      }

      setAdjustedPosition(newPosition);
    }
  }, [visible, position]);

    return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div ref={tooltipRef} className={`tooltip-box tooltip-${adjustedPosition}`}>
          {text}
        </div>
      )}
    </div>
  )
}

export default ToolTip