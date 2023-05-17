import React from "react";
import AdviSesecion from "~/Components/advisesection/AdviSesecion";
import ForSection from "~/Components/forsection/ForSection";
import MainSection from "~/Components/mainsection/MainSection";
import MissionSection from "~/Components/missionsection/MissionSection";
import OfficeSection from "~/Components/officesection/OfficeSection";
import StatisticalSections from "~/Components/statisticalsections/StatisticalSections";
import TeamSection from "~/Components/teamsection/TeamSection";

const AboutPage = () => {
  return (
    <>
      <MainSection />
      <StatisticalSections />
      <MissionSection />
      <ForSection />
      <OfficeSection />
      <TeamSection />
      <AdviSesecion />
    </>
  );
};

export default AboutPage;
