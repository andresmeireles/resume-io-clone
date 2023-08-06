"use client";

import { useResumeContext } from "../context/resume-context";

export default function Score() {
  const { state } = useResumeContext();

  return (
    <div className={`py-4 z-10 transition-all sticky duration-1000 top-0 container bg-white w-full`}>
      <div className="my-2">
        <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 border border-green-400 rounded-md">
          {state.completePercentage.toString()} %
        </span>
        <span className="ml-3 text-xs text-slate-500">Resume score</span>
      </div>
      <div className="flex w-full h-1 bg-blue-200 rounded-md">
        <div style={{ width: `${state.completePercentage}%` }} className={`h-1 transition-all bg-green-400`} />
      </div>
    </div>
  );
}
