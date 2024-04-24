import React from "react";
import { useTranslation } from "react-i18next";

const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.maxTouchPoints > 0;

const TimelineTitle: React.FC = () => {

  const { t } = useTranslation("en");

  return <p className="TimelineTitle" style={{clear: "both"}}><u>{t('timeline-title')}</u>
  {isTouchDevice ? 
  <span style={{float:"right", padding: "0px 2px 0px 2px"}}>{t('mobile-instructions')}</span>
  :
  <span style={{float:"right", padding: "0px 2px 0px 2px"}}>{t('desktop-instructions')}</span>}
  </p>
};

export default TimelineTitle;
