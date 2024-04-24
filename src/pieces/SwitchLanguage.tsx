import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onLanguageSwitch : (newLanguage: string) => void;
}

const SwitchLanguage: React.FC<Props> = ({onLanguageSwitch}) => {

  const { i18n } = useTranslation();
  const lng = i18n.language;

  return <div className="SwitchLanguage">
    {lng.startsWith("en") ? <>En|</> : <><a onClick={(e)=>{e.preventDefault(); onLanguageSwitch('en')}} href="#">En</a>|</>}
    {lng.startsWith("fr") ? <>Fr</> : <><a onClick={(e)=>{e.preventDefault(); onLanguageSwitch('fr')}} href="#">Fr</a></>}
  </div>
};

export default SwitchLanguage;
