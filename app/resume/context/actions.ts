import { Education, Employ, Order, Skill, Social } from "@/types";
import { Actions } from "./reducer";

export type ResumeActions = { action: Actions; value: string } 
  | {action: 'employ', value: Order<Employ>[]} 
  | {action: 'social', value: Order<Social>[]} 
  | {action: 'education', value: Order<Education>[]} 
  | {action: 'skill', value: Order<Skill>[]};
  