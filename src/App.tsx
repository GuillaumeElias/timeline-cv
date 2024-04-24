import "./styles.css";
import React, { useEffect, useRef } from "react";
import Timeline from "./timeline/Timeline";
import EventDetails from "./pieces/EventDetails";
import { Event } from "./types";
import Summary from "./pieces/Summary";
import TimelineTitle from "./pieces/TimelineTitle";
import PersonalInfo from "./pieces/PersonalInfo";
import TechnicalInfo from "./pieces/TechnicalInfo";
import PictureOfMe from "./pieces/PictureOfMe";
import SeeSource from "./pieces/SeeSource";
import SwitchLanguage from "./pieces/SwitchLanguage";
import { I18nextProvider, useTranslation } from "react-i18next";

export const TIMELINE_HEIGHT: number = 250;
export const LINE_HEIGHT: number = 60;
export const MARGIN_SIDE: number = 5;
export const MAX_MOBILE_SCREEN_WIDTH: number = 700;

function getScreenWidth() : number{
  return Math.min(document.documentElement.clientWidth, window.innerWidth);
}

const App: React.FC = () => {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [eventDetailsX, setEventDetailsX] = React.useState(0);
  const [eventDetailsY, setEventDetailsY] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(window.scrollY);
  const [screenWidth, setScreenWidth] = React.useState<number>(getScreenWidth());

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(getScreenWidth());
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
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <h1>Guillaume Elias</h1>
        <SwitchLanguage onLanguageSwitch={changeLanguage}/>
        <SeeSource />
        <Summary />
        <TimelineTitle/>
    
        <Timeline
          onEventSelected={handleEventSelected}
          onEventDeselected={handleEventDeselected}
          selectedEvent={selectedEvent}
          screenWidth={screenWidth}
          scrollY={scrollY}
        />
            
        <div className="infoSection">
          <TechnicalInfo />
          <PersonalInfo />
          <PictureOfMe />
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
        <div
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          autoFocus
          tabIndex={-1}
        />
      </div>
    </I18nextProvider>
  );
};

export default App;
