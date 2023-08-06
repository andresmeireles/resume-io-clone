import { Education, Employ, Order, Skill, Social } from "@/types";

export enum Actions {
  wantedJob = "wantedJob",
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  phone = "phone",
  city = "city",
  country = "country",
  address = "address",
  postalCode = "postalCode",
  drivingLicense = "drivingLicense",
  nationality = "nationality",
  placeOfBirth = "placeOfBirth",
  dateOfBirth = "dateOfBirth",
  summary = "summary",
}

export type ResumeActions = { action: Actions; value: string } 
  | {action: 'employ', value: Order<Employ>[]} 
  | {action: 'social', value: Order<Social>[]} 
  | {action: 'education', value: Order<Education>[]} 
  | {action: 'skill', value: Order<Skill>[]};
  