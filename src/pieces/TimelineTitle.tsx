import React from "react";

const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.maxTouchPoints > 0;

const TimelineTitle: React.FC = () => (
  <p className="TimelineTitle" style={{clear: "both"}}><u>Career timeline:</u>
  {isTouchDevice ? 
  <span style={{float:"right", padding: "0px 2px 0px 2px"}}>swipe left or right</span>
  :
  <span style={{float:"right", padding: "0px 2px 0px 2px"}}>move mouse and click for details</span>}
  </p>
);

export default TimelineTitle;
