export type Social = {
  name: string;
  link: string;
};

export type Order<T> = {
  value: T;
  order: number;
  visible: boolean;
  hash: string;
};

export type Employ = {
  company: string;
  job: string;
  startDate: Date;
  endDate?: Date;
  city: string;
  description: string;
};

export type Education = {
  school: string;
  degree: string;
  startDate: Date;
  city?: string; 
  endDate?: Date;
  description?: string;
};

export type Skill = {
  name: string;
  proficiency: Proficiency;
};

export enum Proficiency {
  novice = "novice",
  beginner = "beginner",
  skillful = "skillful",
  experienced = "experienced",
  master = "master"
}

export type Orders = Order<Employ> | Order<Social> | Order<Education> | Order<Skill>;

export interface TileProps<T> {
  className?: string;
  order: Order<T>;
}

export type ResumeData = {
  wantedJob: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  drivingLicense: string;
  nationality: string;
  placeOfBirth: string;
  dateOfBirth: string;
  summary: string;
  employ: Order<Employ>[];
  education: Order<Education>[];
  skill: Order<Skill>[];
  social: Order<Social>[];
};
