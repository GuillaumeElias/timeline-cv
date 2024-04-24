import React from "react";

const PersonalInfo: React.FC = () => (
  <div className="PersonalInfo">
    <p><u>Personnal information : </u></p>
    <p>Linguae : French/English (C1-C2) Dutch/Spanish (B1-B2)</p>
    <p>Hobbies : Cycling, Canoeing, Vintage synthsizers, indie video games, movies starring Alex Guinness</p>
const PersonalInfo: React.FC = () => {

  const { t } = useTranslation("en");

  return <div className="PersonalInfo">
    <p><u>{t('personalInfo')}</u></p>
      <p>{t('linguae')}</p>
      <p>{t('hobbies')}</p>
      <p>{t('email')}</p>
      <p>{t('address')}</p>
  </div>
};

export default PersonalInfo;
