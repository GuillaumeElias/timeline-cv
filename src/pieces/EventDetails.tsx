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
  scrollY: number;
}

const WIDTH: number = 500;
const MOUSE_OFFSET: number = 5;

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  x,
  y,
  onClose,
  scrollY,
}) => {
  const eventDetailsContainerRef = useRef<HTMLDivElement>(null);

  const calculateDivHeight = () => {
    if (!eventDetailsContainerRef.current) {
      return 0;
    } else {
      return eventDetailsContainerRef.current.offsetHeight;
    }
  };

  const screenWidth = Math.min(
    document.documentElement.clientWidth,
    window.innerWidth,
  );

  const screenHeight = Math.min(
    document.documentElement.clientHeight,
    window.innerHeight,
  );

  let width = WIDTH;
  if (screenWidth - MARGIN_SIDE * 5 < width) {
    width = screenWidth - MARGIN_SIDE * 5;
  }

  // if there is not enough space for the event height, move it
  const estimatedHeight = 260;
  if (y + estimatedHeight > screenHeight - MARGIN_SIDE * 2) {
    y = screenHeight - estimatedHeight - MARGIN_SIDE * 2;
  } else if (y < scrollY) {
    y = scrollY;
  }

  if (x + MOUSE_OFFSET + width > screenWidth - MARGIN_SIDE * 5) {
    x = screenWidth - MARGIN_SIDE * 5 - width;
  } else {
    x += MOUSE_OFFSET;
    y += MOUSE_OFFSET;
  }

  return (
    <div
      ref={eventDetailsContainerRef}
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
        textAlign: "left",
      }}
    >
      <button className="closeButton" onClick={onClose}>
        ✖
      </button>
      <h4>{event.label}</h4>
      {event.selfEmployed && (
        <p className="selfEmployed">
          <i>Self-employed</i>
        </p>
      )}
      <b>{event.place} </b> <img src={getFlagPath(event)} height={20} />
      <p>{event.description}</p>
      <p>Duration : {calculateDuration(event)}</p>
      <p>Time allocation : {event.timePercentage}%</p>
    </div>
  );
};

export default EventDetails;
