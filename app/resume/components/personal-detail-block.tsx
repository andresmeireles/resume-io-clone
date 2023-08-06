import Avatar from "@/core/components/avatar";
import Input from "@/core/components/form/input";
import Label from "@/core/components/form/label";
import { ArrowDown } from "@/core/icons/arrow-down";
import { useResumeContext } from "../context/resume-context";
import { ChangeEvent, useState } from "react";
import { Actions } from "../context/actions";

interface PersonDetailBlockProps {
  className?: string;
}

export default function PersonDetailBlock({ className }: PersonDetailBlockProps) {
  const {
    state: { resume },
    dispatch,
  } = useResumeContext();
  const [show, setShow] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    const act = Object.values(Actions).find((enumValue) => enumValue === name);
    if (act === undefined) return;
    dispatch({ action: act as Actions, value });
  };

  return (
    <div className={`${className}`}>
      <div>
        <div className="font-bold text-md">Personal Details</div>
        <Label htmlFor="wanted_job" className="text-slate-500">
          Wanted Job Title
        </Label>
        <Input name="wantedJob" value={resume.wantedJob} onChange={handleChange} />
        <Avatar className="my-4" />
        <Label htmlFor="firstName" className="text-slate-500">
          First Name
        </Label>
        <Input name="firstName" value={resume.firstName} onChange={handleChange} />
        <Label htmlFor="lastName" className="text-slate-500">
          Last Name
        </Label>
        <Input name="lastName" value={resume.lastName} onChange={handleChange} />
        <Label htmlFor="email" className="text-slate-500">
          Email
        </Label>
        <Input name="email" type="email" value={resume.email} onChange={handleChange} />
        <Label htmlFor="phone" className="text-slate-500">
          Phone
        </Label>
        <Input name="phone" value={resume.phone} onChange={handleChange} />
        <Label htmlFor="country" className="text-slate-500">
          Country
        </Label>
        <Input name="country" value={resume.country} onChange={handleChange} />
        <div
          className={`transform transition-transform duration-500 ${show ? "ease-in-out block" : "ease-in-out hidden"}`}
        >
          <Label htmlFor="city" className="text-slate-500">
            City
          </Label>
          <Input name="city" value={resume.city} onChange={handleChange} />
          <Label className="text-slate-500" htmlFor="address">
            Address
          </Label>
          <Input id="address" name="address" value={resume.address} onChange={handleChange} />
          <Label className="text-slate-500" htmlFor="postalCode">
            Postal Code
          </Label>
          <Input id="postalCode" name="postalCode" value={resume.postalCode} onChange={handleChange} />
          <Label className="text-slate-500" htmlFor="drivingLicense">
            Driving License
          </Label>
          <Input id="drivingLicense" name="drivingLicense" value={resume.drivingLicense} onChange={handleChange} />
          <Label className="text-slate-500" htmlFor="nationality">
            Nationality
          </Label>
          <Input id="nationality" name="nationality" value={resume.nationality} onChange={handleChange} />
          <Label className="text-slate-500" htmlFor="placeOfBirth">
            Place of Birth
          </Label>
          <Input id="placeOfBirth" name="placeOfBirth" value={resume.placeOfBirth} onChange={handleChange} />
          <Label className="text-slate-500" htmlFor="dateOfBirth">
            Date of Birth
          </Label>
          <Input id="dateOfBirth" name="dateOfBirth" value={resume.dateOfBirth} onChange={handleChange} />
        </div>
      </div>
      <div onClick={() => setShow(!show)} className="flex items-center my-5 space-x-2 cursor-pointer hover:opacity-80">
        <span className="text-sm font-bold text-blue-500">
          {!show ? "Edit additional details" : "Hide additional details"}
        </span>
        <ArrowDown
          className={`text-xl font-bold text-blue-500 transition duration-200 ${show ? "rotate-180" : "rotate-0"}`}
        />
      </div>
    </div>
  );
}
