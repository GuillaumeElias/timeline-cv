import React from "react";
import { useTranslation } from "react-i18next";

const TechnicalInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="TechnicalInfo">
      <p><u>{t('technicalSkills')}</u></p>
      <p>
        <img src="images/cpplogo.svg" height={25} /> {t('cppSkills')}<br/>
        <img src="images/react_ts.png" height={25} /> {t('reactTsSkills')}<br/>
        <img src="images/android.png" height={25} /> {t('androidSkills')}<br/>
        <img src="images/javalogo.png" height={25} /> {t('javaSkills')}<br/>
        <img src="images/python.png" height={25} /> {t('pythonSkills')}<br/>
        <img src="images/asm.png" height={25} /> {t('asmSkills')}<br/>
        <img src="images/linux.png" height={25} /> {t('linuxSkills')}<br/>
      </p>
    </div>
  );
};

export default TechnicalInfo;
