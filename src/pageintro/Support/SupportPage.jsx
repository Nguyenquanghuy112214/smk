import React from "react";
import AllQuestionSection from "~/Components/allquestionsection/AllQuestionSection";
import QuestionsSection from "~/Components/questionssection/QuestionsSection";
import SupportSection from "~/Components/supportsection/SupportSection";


const SupportPage = () => {
  return (
    <>
      <QuestionsSection />
      <AllQuestionSection />
      <SupportSection />
    </>
  );
};

export default SupportPage;
