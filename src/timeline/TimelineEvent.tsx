import React, { useEffect, useRef, useState } from "react";
import { Group, Image, Rect, Text } from "react-konva";
import { tsToStr } from "../dateutil";
import { Event, TYPES } from "../types";
import { getFlagPath } from "../data";
import UrlImg from "./UrlImg";
import { LINE_HEIGHT } from "../App";
import TinyPieChart from "./TinyPieChart";

interface TimelineEventProps {
  index: number;
  x: number;
  y: number;
  eventWidth: number;
  event: Event;
  onEventSelected: (event: Event, x: number, y: number) => void;
  pause: boolean;
  selected: boolean;
  pointedAt: boolean;
}

const EXPANDED_HEIGHT = 200;

const TimelineEvent: React.FC<TimelineEventProps> = ({
  index,
  x,
  y,
  eventWidth,
  event,
  onEventSelected,
  pause,
  selected,
  pointedAt
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const handleClick = (e: any) => {
    onEventSelected(event, x, y);
  };

  const handleMouseEnter = (e: any) => {
    setHovered(true);
    if (!pause) {
      const container = e.target.getStage().container();
      container.style.cursor = "pointer";
    }
  };

  const handleMouseLeave = (e: any) => {
    setHovered(false);
    const container = e.target.getStage().container();
    container.style.cursor = "default";
  };

  return (
    <Group
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Rect
        x={x}
        y={y}
        width={eventWidth}
        height={LINE_HEIGHT + (pointedAt ? 1 : 0)}
        fill={TYPES[event.type]}
        stroke={TYPES[event.type]}
        strokeWidth={1 + (hovered ? 1 : 0)} // 1px border width
      />
      <Text
        x={x + 5}
        y={y + 10}
        wrap="word"
        width={eventWidth - 10}
        text={event.label}
        fill="white"
        fontFamily="Courier New, monospace"
        fontStyle={selected ? "bold" : "normal"}
        fontSize={event.type == "INTERNSHIP" ? 13 : 15}
      />
      { event.type != "INTERNSHIP" && 
        <>
          <UrlImg x={x + eventWidth - 30} y={y + LINE_HEIGHT - 15} width={20} src={getFlagPath(event)} height={10} />
          <TinyPieChart x={x + eventWidth - 50} y={y + LINE_HEIGHT - 15} percentage={event.timePercentage} radius={5} backgroundColor={TYPES[event.type]} />
        </>
      }
    </Group>
  );
};

export default TimelineEvent;
