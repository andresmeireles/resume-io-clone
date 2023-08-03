import { useResumeContext } from "../context/resume-context";

export default function Title() {
  const { state } = useResumeContext();

  return (
    <h1 className="pt-6 text-2xl text-center">{state.fullName.trim().length === 0 ? "Untitled" : state.fullName}</h1>
  );
}
