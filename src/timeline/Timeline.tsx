import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Group, Text } from "react-konva";
import TimelineEvent from "./TimelineEvent";
import { toTs, tsToShortStr } from "../dateutil";
import { Event, TYPES } from "../types";
import { timelineData } from "../data";
import Konva from "konva";
import { MARGIN_SIDE, TIMELINE_HEIGHT, LINE_HEIGHT } from "../App";

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;

interface Props {
  onEventSelected: (event: Event, mouseX: number, mouseY: number) => void;
  onEventDeselected: () => void;
  selectedEvent: null | Event;
  screenWidth: number;
  scrollY: number;
}

const Timeline: React.FC<Props> = ({
  onEventSelected,
  onEventDeselected,
  selectedEvent,
  screenWidth,
  scrollY,
}) => {
  timelineData.sort((a, b) => {
    const endDateA = a.endDate || a.startDate;
    const endDateB = b.endDate || b.startDate;
    return endDateA - endDateB;
  });

  // Constants
  const marginHeight = 8;
  const legendHeight = 20;

  const timelineStartDate = timelineData[0].startDate;
  const timelineEndDate = toTs("2025-01-01");
  const totalTime = timelineEndDate - timelineStartDate;

  const MAX_TIMELINE_WIDTH = screenWidth - MARGIN_SIDE * 2 - 10;

  const [timelineWidth, setTimelineWidth] = useState(MAX_TIMELINE_WIDTH * 2);
  const [mouseX, setMouseX] = useState<number | undefined>(undefined);
  const [mouseY, setMouseY] = useState<number | undefined>(undefined);
  const [mouseDate, setMouseDate] = useState<number | null>(null);
  const [scrollX, setScrollX] = useState(0);

  const mouseXRef = useRef<number | undefined>(undefined);
  const mouseYRef = useRef<number | undefined>(undefined);
  const timelineMarginTopRef = useRef<number | undefined>(undefined);
  const timelineWidthRef = useRef<number>(timelineWidth);
  const scrollXRef = useRef<number>(0);

  useEffect(() => {
    mouseXRef.current = mouseX;
  }, [mouseX]);

  useEffect(() => {
    mouseYRef.current = mouseY;
  }, [mouseY]);

  useEffect(() => {
    scrollXRef.current = scrollX;
  }, [scrollX]);

  useEffect(() => {
    timelineWidthRef.current = timelineWidth;
  }, [timelineWidth]);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      timelineMarginTopRef.current = canvas.getBoundingClientRect().top;
    }
  }, [scrollY, screenWidth]);

  const computeAndSetMouseDate = (prevX: number) => {
    const mouseTimestamp =
      timelineStartDate +
      ((prevX + scrollXRef.current) / timelineWidthRef.current) *
        (timelineEndDate - timelineStartDate);
    setMouseDate(mouseTimestamp);
  };

  const isMouseInTimeline = (mouseY: number): boolean =>
    mouseY !== undefined &&
    timelineMarginTopRef.current !== undefined &&
    mouseY < timelineMarginTopRef.current + TIMELINE_HEIGHT &&
    mouseY > timelineMarginTopRef.current;

  const anim = new Konva.Animation((frame) => {
    if (selectedEvent) return;

    if (mouseXRef.current) {
      if (mouseYRef.current && isMouseInTimeline(mouseYRef.current)) {
        const deltaX = Math.abs(mouseXRef.current - screenWidth / 2);
        if (
          scrollXRef.current + screenWidth < timelineWidthRef.current &&
          mouseXRef.current > (screenWidth / 3) * 2
        ) {
          setScrollX((prevX) => prevX + deltaX / 60);
        } else if (
          scrollXRef.current > 0 &&
          mouseXRef.current < screenWidth / 3
        ) {
          setScrollX((prevX) => prevX - deltaX / 60);
        }
        computeAndSetMouseDate(mouseXRef.current);
      }
    }
  });

  React.useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (selectedEvent || !isMouseInTimeline(event.clientY)) return;
      event.preventDefault();
      setTimelineWidth((prevWidth) =>
        prevWidth + event.deltaY < MAX_TIMELINE_WIDTH
          ? prevWidth
          : prevWidth + event.deltaY,
      );
    };
    const handleMouseMove = (event: MouseEvent) => {
      if (selectedEvent) return;
      if (event && event.clientX > 0 && event.clientY > 0) {
        if (event.clientY && isMouseInTimeline(event.clientY)) {
          setMouseX(event.clientX);
          setMouseY(event.clientY);
          computeAndSetMouseDate(event.clientX);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);

    anim.start();

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      anim.stop();
    };
  }, [selectedEvent, screenWidth]);

  return (
    <div
      id="timelineWrapper"
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
        width: screenWidth - MARGIN_SIDE * 2,
        height: TIMELINE_HEIGHT,
      }}
    >
      <Stage
        id="canvas"
        width={screenWidth - MARGIN_SIDE * 2}
        height={TIMELINE_HEIGHT}
        onMouseMove={(e) => {
          setMouseX(e.evt.clientX);
          setMouseY(e.evt.clientY);
        }}
      >
        <Layer key={0}>
          <Group
            onClick={() => {
              if (selectedEvent) {
                onEventDeselected();
              }
            }}
            onTap={() => {
              if (selectedEvent) {
                onEventDeselected();
              }
            }}
            draggable
            dragBoundFunc={function (pos) {

              if (!isTouchDevice || (mouseX && mouseX > 0)){ //if not a touch device or mouse has been detected
                return {
                  x: 0,
                  y: 0
                };
              }

              let x = pos.x;

              if(x > 0 || x < -timelineWidth + screenWidth){
                x = this.absolutePosition().x; //cancel if outside of bounds
              }

              return {
                x: x,
                y: 0
              };
            }}
          >
            <Rect
              id="timeline-background"
              x={MARGIN_SIDE}
              y={0}
              width={timelineWidth}
              height={TIMELINE_HEIGHT}
              fill={"transparent"}
            />

            {mouseX && (
              <>
                <Rect
                  id="tracking-line"
                  x={mouseX}
                  y={0}
                  width={1}
                  height={TIMELINE_HEIGHT - 5}
                  fill="#93003a"
                />
                <Text
                  id="tracking-text"
                  x={mouseX < screenWidth - 100 ? mouseX + 5 : mouseX - 60}
                  y={TIMELINE_HEIGHT - 5 - legendHeight / 2} // Adjust vertical position
                  text={tsToShortStr(mouseDate || timelineStartDate)} // Convert timestamp to string
                  fill="#93003a"
                  fontFamily="Courier New, monospace"
                />
              </>
            )}

            {timelineData.map((event, index) => {
              const startTimeOffset = event.startDate - timelineStartDate;
              const endTimeOffset = event.endDate
                ? event.endDate - timelineStartDate
                : totalTime;
              const startX = (startTimeOffset / totalTime) * timelineWidth;
              const endX = (endTimeOffset / totalTime) * timelineWidth;
              const eventWidth = endX - startX;

              const pointedAt: boolean =
                !selectedEvent &&
                !!mouseX &&
                mouseX + scrollX > startX &&
                mouseX + scrollX < endX;

              return (
                <Group key={"group_" + index}>
                  <TimelineEvent
                    key={index}
                    index={index}
                    x={MARGIN_SIDE + startX - scrollX}
                    y={4 + event.line * LINE_HEIGHT + marginHeight * event.line}
                    eventWidth={eventWidth}
                    pointedAt={pointedAt}
                    event={event}
                    pause={!!selectedEvent}
                    selected={event == selectedEvent}
                    onEventSelected={(e: Event, x: number, y: number) => {
                      if(mouseX && mouseY){
                        onEventSelected(e, mouseX, mouseY)
                      }else{
                        onEventSelected(e, 0, y);
                      }
                    }
                    }
                  />
                  {!event.hideDate && (
                    <Text
                      key={"text_" + index}
                      x={MARGIN_SIDE + startX - scrollX - 4}
                      y={TIMELINE_HEIGHT - 35}
                      text={"| " + tsToShortStr(event.startDate)}
                      fill="black"
                      fontFamily="Courier New, monospace"
                    />
                  )}
                </Group>
              );
            })}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default Timeline;
