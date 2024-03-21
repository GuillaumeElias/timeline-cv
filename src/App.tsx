import "./styles.css";
import React, { useEffect, useRef } from "react";
import Timeline from "./timeline/Timeline";
import EventDetails from "./pieces/EventDetails";
import { Event } from "./types";
import Summary from "./pieces/Summary";
import TimelineTitle from "./pieces/TimelineTitle";
import PersonalInfo from "./pieces/PersonalInfo";
import TechnicalInfo from "./pieces/TechnicalInfo";
import SeeSource from "./pieces/SeeSource";

export const TIMELINE_HEIGHT: number = 250;
export const LINE_HEIGHT: number = 60;
export const MARGIN_SIDE: number = 5;

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [eventDetailsX, setEventDetailsX] = React.useState(0);
  const [eventDetailsY, setEventDetailsY] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(window.scrollY);

  const [screenWidth, setScreenWidth] = React.useState(
    Math.min(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  );
  const defaultInfoSectionY =
    screenWidth <= 600 ? TIMELINE_HEIGHT + 290 : TIMELINE_HEIGHT + 180;
  const [timelineBottomY, setTimelineBottomY] =
    React.useState(defaultInfoSectionY);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(
        Math.min(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0,
        ),
      );
      const canvas = document.getElementById("canvas");
      if (canvas) {
        setTimelineBottomY(
          canvas.getBoundingClientRect().top + scrollY + TIMELINE_HEIGHT,
        );
      }
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      setTimelineBottomY(
        canvas.getBoundingClientRect().top + scrollY + TIMELINE_HEIGHT,
      );
    }
  }, [scrollY, screenWidth]);

  const handleEventSelected = (
    event: Event,
    mouseX: number,
    mouseY: number,
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
      <SeeSource />
      <Summary />
      <TimelineTitle />

      <Timeline
        onEventSelected={handleEventSelected}
        onEventDeselected={handleEventDeselected}
        selectedEvent={selectedEvent}
        screenWidth={screenWidth}
        scrollY={scrollY}
      />

      <div
        className="infoSection"
        style={{
          position: "absolute",
          top: timelineBottomY,
        }}
      >
        <TechnicalInfo />
        <PersonalInfo />
      </div>
      {selectedEvent && (
        <EventDetails
          x={eventDetailsX}
          y={eventDetailsY}
          event={selectedEvent}
          onClose={handleEventDeselected}
          scrollY={scrollY}
        />
      )}
    </div>
  );
};

export default App;
