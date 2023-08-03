import { Dispatch, createContext, useContext, useReducer } from "react";
import Resume from "./states";
import reducer from "./reducer";
import { ResumeActions } from "./actions";

interface ResumeContextInterface {
  state: Resume;
  dispatch: Dispatch<ResumeActions>;
}

const ResumeContext: ResumeContextInterface = {
  state: Resume.createEmpty(),
  dispatch: () => {},
};

const resumeContext = createContext<ResumeContextInterface>(ResumeContext);

interface ResumeProviderProps {
  className?: string;
  children: React.ReactNode;
}

export const useResumeContext = () => useContext(resumeContext);

export default function ResumeProvider(props: ResumeProviderProps) {
  const { children, className } = props;

  const [state, dispatch] = useReducer(reducer, Resume.createEmpty());

  return (
    <resumeContext.Provider value={{ state, dispatch }}>
      <div className={`${className}`}>{children}</div>
    </resumeContext.Provider>
  );
}
