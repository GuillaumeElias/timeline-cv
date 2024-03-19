import React, { useEffect, useRef, useState } from "react";
import { Event, TYPES } from "../types";

import { MARGIN_SIDE, TIMELINE_HEIGHT } from "../App";
import { getFlagPath } from "../data";
import { calculateDuration } from "../dateutil";

interface EventDetailsProps {
  event: Event;
  x: number;
  y: number;
  onClose: () => void;
}

const WIDTH: number = 500;
const MOUSE_OFFSET: number = 5;

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  x,
  y,
  onClose,
}) => {
  
  const screenWidth = Math.min(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  let width = WIDTH;
  if(screenWidth - MARGIN_SIDE * 5 < width){
    width = screenWidth - MARGIN_SIDE * 5;
  }

  if (x + MOUSE_OFFSET + width > screenWidth - MARGIN_SIDE * 5) {
    x = screenWidth - MARGIN_SIDE * 5 - width;
  } else {
    x += MOUSE_OFFSET;
    y += MOUSE_OFFSET;
  }

  return (
    <div
      id="eventDetailsContainer"
      tabIndex={-1}
      style={{
        position: "absolute",
        top: y,
        left: x,
        backgroundColor: "white",
        width: width + "px",
        borderRadius: "1px",
        padding: "5px",
        border: "2px solid " + TYPES[event.type],
        textAlign: "left"
      }}
    >
      
        <span
          style={{
            fontSize: "20px",
            cursor: "pointer",
            position: "absolute",
            top: "0",
            right: "0",
            padding: "5px 5px 0px 0px",
          }}
          onClick={onClose}
        >
          ✖
        </span>
        <h4>{event.label}</h4>
        {event.selfEmployed && <p className="selfEmployed"><i>Self-employed</i></p>}
        <b>{event.place} </b>     <img src={getFlagPath(event)} height={20} />
        <p>{event.description}</p>
        <p>Duration : {calculateDuration(event)}</p>
        <p>Time allocation : {event.timePercentage}%</p>
        <input
        type="text"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        autoFocus
        tabIndex={-1}
        />    
      </div>
  );
};

export default EventDetails;