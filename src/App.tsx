import "./styles.css";
import React, { useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Timeline from "./timeline/Timeline";
import EventDetails from "./pieces/EventDetails";
import { Event } from "./types";
import Summary from "./pieces/Summary";
import TimelineTitle from "./pieces/TimelineTitle";

export const TIMELINE_HEIGHT: number = 300;
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

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(
        Math.min(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        )
      );
    };

    window.addEventListener("resize", handleResize);

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
        <TimelineTitle />
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
