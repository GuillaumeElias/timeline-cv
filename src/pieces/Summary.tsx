import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";


const Summary: React.FC = () => {

  const { t } = useTranslation("en");

  return <div className="Summary">
      {t('summary')}
    </div>
};

export default Summary;
