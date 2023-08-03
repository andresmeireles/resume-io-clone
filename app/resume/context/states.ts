import { ResumeData } from "@/types";

export default class Resume {
  constructor(private _resume: ResumeData) {}

  static createEmpty(): Resume {
    const emptyResume: ResumeData = {
      wantedJob: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      address: "",
      postalCode: "",
      drivingLicense: "",
      nationality: "",
      placeOfBirth: "",
      dateOfBirth: "",
      summary: "",
      employ: [],
      education: [],
      skill: [],
      social: [],
    };

    return new Resume(emptyResume);
  }

  get resume(): ResumeData {
    return this._resume;
  }

  get fullName(): string {
    return `${this._resume.firstName} ${this._resume.lastName}`;
  }

  get completePercentage(): number {
    return Math.round((this.numberOfItemsFilled / this.numberOfItems) * 100);
  }

  get numberOfItems(): number {
    return Object.keys(this._resume).length;
  }

  get numberOfItemsFilled(): number {
    let total = 0;

    if (this._resume.wantedJob.trim() !== "") total++;
    if (this._resume.firstName.trim() !== "") total++;
    if (this._resume.lastName.trim() !== "") total++;
    if (this._resume.email.trim() !== "") total++;
    if (this._resume.phone.trim() !== "") total++;
    if (this._resume.city.trim() !== "") total++;
    if (this._resume.country.trim() !== "") total++;
    if (this._resume.address.trim() !== "") total++;
    if (this._resume.postalCode.trim() !== "") total++;
    if (this._resume.drivingLicense.trim() !== "") total++;
    if (this._resume.nationality.trim() !== "") total++;
    if (this._resume.placeOfBirth.trim() !== "") total++;
    if (this._resume.dateOfBirth.trim() !== "") total++;
    if (this._resume.summary.trim() !== "") total++;
    if (this._resume.employ.length !== 0) total++;
    if (this._resume.education.length !== 0) total++;
    if (this._resume.skill.length !== 0) total++;
    if (this._resume.social.length !== 0) total++;

    return total;
  }

  copyWith(data: Partial<ResumeData>): Resume {
    return new Resume({ ...this._resume, ...data });
  }
}
