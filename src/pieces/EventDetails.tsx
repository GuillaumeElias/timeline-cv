import React, { useEffect, useRef, useState } from "react";
import { Event, TYPES } from "../types";

import { MARGIN_SIDE, MARGIN_TOP_TIMELINE, TIMELINE_HEIGHT } from "../App";
import { getFlagPath } from "../data";

interface EventDetailsProps {
  event: Event;
  x: number;
  y: number;
  onClose: () => void;
}

const WIDTH: number = 500;
const HEIGHT: number = 200;
const MOUSE_OFFSET: number = 5;

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  x,
  y,
  onClose,
}) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLSpanElement>(null);

  const screenWidth = Math.min(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  if (x + MOUSE_OFFSET + WIDTH > screenWidth - MARGIN_SIDE * 5) {
    x = screenWidth - MARGIN_SIDE * 5 - WIDTH;
  } else {
    x += MOUSE_OFFSET;
    y += MOUSE_OFFSET;
  }

  useEffect(() => {
    if (containerRef.current && closeButtonRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div
      id="eventDetailsContainer"
      ref={containerRef}
      tabIndex={-1}
      style={{
        position: "absolute",
        top: y,
        left: x,
        backgroundColor: "white",
        width: WIDTH + "px",
        height: "200px",
        borderRadius: "1px",
        padding: "5px",
        border: "2px solid " + TYPES[event.type],
        textAlign: "left"
      }}
    >
      
        <span
          ref={closeButtonRef}
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
        <b>{event.place} </b>     <img src={getFlagPath(event)} height={20} />

        <p>{event.description}</p>
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
