import "./styles.css";
import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import Timeline from "./timeline/Timeline";
import EventDetails from "./pieces/EventDetails";
import { Event } from "./types";
import Summary from "./pieces/Summary";
import TimelineTitle from "./pieces/TimelineTitle";

export const MARGIN_TOP_TIMELINE: number = 200;
export const TIMELINE_HEIGHT: number = 200;

export const MARGIN_SIDE: number = 5;

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [mouseX, setMouseX] = React.useState(0);
  const [mouseY, setMouseY] = React.useState(0);
  const [eventDetailsX, setEventDetailsX] = React.useState(0);
  const [eventDetailsY, setEventDetailsY] = React.useState(0);

  const handleEventSelected = (
    event: Event,
    x: number,
    y: number,
    lineHeight: number
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
          //top: MARGIN_TOP_TIMELINE,
        }}
      >
        <TimelineTitle />
        <Stage
          id="canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseMove={(e) => {
            const canvas = document.getElementById("canvas");
            let topY = 0;
            /*if (canvas) {
              const stageYCoordinate =
                canvas.getBoundingClientRect().top + window.pageYOffset;
              console.log("Y Coordinate of Stage:", stageYCoordinate);
              topY = stageYCoordinate;
            }*/
            setMouseX(e.evt.clientX);
            setMouseY(topY + e.evt.clientY);
          }}
        >
          <Layer key={0}>
            <Timeline
              onEventSelected={handleEventSelected}
              onEventDeselected={handleEventDeselected}
              selectedEvent={selectedEvent}
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
