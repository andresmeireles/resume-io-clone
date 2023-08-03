import TextAreaEditor from "@/core/components/form/text-area-editor";
import { useResumeContext } from "../context/resume-context";
import { Actions } from "../context/reducer";

export default function ProfessionalSummaryBlock() {
  const { state, dispatch } = useResumeContext();
  const { resume } = state;
  return (
    <div>
      <h1 className="font-bold text-md">Professional Summary</h1>

      <TextAreaEditor value={resume.summary} setValue={(value) => dispatch({ action: Actions.summary, value })} />
    </div>
  );
}
