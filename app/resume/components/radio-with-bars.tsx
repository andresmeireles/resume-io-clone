"use client";

import { Proficiency } from "@/types.d";

interface RadioWithBarsProps {
  proficiency: Proficiency;
  setProficiency: (e: Proficiency) => void;
}

export default function RadioWithBars({ proficiency, setProficiency }: RadioWithBarsProps) {
  const color = `bg-${proficiency.valueOf()}`;
  const colorSoft = `bg-${proficiency.valueOf()}-soft`;
  const colorHover = `bg-${proficiency.valueOf()}-hover`;

  const proficiencies = Object.values(Proficiency);

  const renderBar = (p: Proficiency) => {
    const isActive = proficiency === p;

    return (
      <>
        <div onClick={() => setProficiency(p)} className={`w-full h-12 rounded-lg ${isActive ? `${color}` : ""}`} />
      </>
    );
  };

  return (
    <div className={`grid h-12 grid-cols-5 rounded-l-lg rounded-r-lg ${colorSoft}`}>
      {proficiencies.map((c, index) => (
        <div className={`flex items-center justify-end ${colorHover}`} key={index}>
          {renderBar(c)}
          <div className={`h-6 ${index === proficiencies.length - 1 ? "" : "border-r border-red-700"}`}></div>
        </div>
      ))}
    </div>
  );
}
