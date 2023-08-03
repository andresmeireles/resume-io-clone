"use client";

import ResumeProvider from "./context/resume-context";
import EmploymentBlock from "./components/employment-block";
import EducationBlock from "./components/education-block";
import SocialMediaBlock from "./components/social-media-block";
import SkillBlock from "./components/skill-block";
import PersonDetailBlock from "./components/personal-detail-block";
import ProfessionalSummaryBlock from "./components/professional-summary-block";
import Score from "./components/score";
import Title from "./components/title";

export default function ResumePage() {
  return (
    <ResumeProvider className="container h-full mx-auto">
      <Title />
      <Score />
      <PersonDetailBlock />
      <ProfessionalSummaryBlock />
      <EmploymentBlock className="block mt-10" />
      <EducationBlock />
      <SocialMediaBlock />
      <SkillBlock className="my-8" />
    </ResumeProvider>
  );
}
