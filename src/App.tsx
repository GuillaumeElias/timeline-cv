import "./styles.css";
import React, { useEffect, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Timeline from "./timeline/Timeline";
import EventDetails from "./pieces/EventDetails";
import { Event } from "./types";
import Summary from "./pieces/Summary";
import TimelineTitle from "./pieces/TimelineTitle";
import PersonalInfo from "./pieces/PersonalInfo";
import TechnicalInfo from "./pieces/TechnicalInfo";

export const TIMELINE_HEIGHT: number = 250;
export const LINE_HEIGHT: number = 60;
export const MARGIN_SIDE: number = 5;

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [mouseX, setMouseX] = React.useState(0);
  const [mouseY, setMouseY] = React.useState(0);
  const [eventDetailsX, setEventDetailsX] = React.useState(0);
  const [eventDetailsY, setEventDetailsY] = React.useState(0);

  const [screenWidth, setScreenWidth] = React.useState(
    Math.min(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
  );

  const timelineBottomYRef = useRef(0);
  const defaultInfoSectionY = screenWidth <= 500 ? TIMELINE_HEIGHT + 250 : TIMELINE_HEIGHT + 160;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(
        Math.min(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
      );
      const canvas = document.getElementById("canvas");
      if (canvas) {
        timelineBottomYRef.current = canvas.getBoundingClientRect().top + window.pageYOffset + TIMELINE_HEIGHT;
      }
    };

    window.addEventListener("resize", handleResize);

    const canvas = document.getElementById("canvas");
    if (canvas) {
      timelineBottomYRef.current = canvas.getBoundingClientRect().top + window.pageYOffset + TIMELINE_HEIGHT;
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEventSelected = (
    event: Event,
  ): void => {
    setSelectedEvent(event);
    setEventDetailsX(mouseX);
    setEventDetailsY(mouseY);
  };

  const handleEventDeselected = (): void => {
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <h1>Guillaume Elias</h1>
      <Summary />
      <TimelineTitle />
      <div
        id="timelineWrapper"
        style={{
          margin: 0,
          padding: 0,
          overflow: "hidden",
          position: "absolute",
          width: screenWidth - MARGIN_SIDE * 2,
          height: TIMELINE_HEIGHT
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
            <Timeline
              onEventSelected={handleEventSelected}
              onEventDeselected={handleEventDeselected}
              selectedEvent={selectedEvent}
              screenWidth={screenWidth}
            />
          </Layer>
        </Stage>
      </div>
      <div className="infoSection" style={{position: "absolute", top: timelineBottomYRef.current ? timelineBottomYRef.current : defaultInfoSectionY}}>
        <TechnicalInfo />
        <PersonalInfo />
      </div>
      {selectedEvent && (
        <EventDetails
          x={eventDetailsX}
          y={eventDetailsY}
          event={selectedEvent}
          onClose={handleEventDeselected}
        />
      )}
    </div>
  );
};

export default App;
