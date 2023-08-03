import Input from "@/core/components/form/input";
import Label from "@/core/components/form/label";
import Modal from "./modal";
import { ChangeEvent, useReducer, useState } from "react";
import TextAreaEditor from "@/core/components/form/text-area-editor";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Education, Order } from "@/types";
import { Add } from "@/core/icons/add";

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  degreeName?: string;
  add: (e: Education) => void;
}

interface EducationForm {
  school?: string;
  degree?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

enum Action {
  school,
  degree,
  startDate,
  endDate,
  description,
}

const reducer = (state: EducationForm, action: { action: Action; value: string }): EducationForm => {
  switch (action.action) {
    case Action.school:
      return {
        ...state,
        school: action.value,
      };
    case Action.degree:
      return {
        ...state,
        degree: action.value,
      };
    case Action.startDate:
      return {
        ...state,
        startDate: new Date(action.value),
      };
    case Action.endDate:
      return {
        ...state,
        endDate: new Date(action.value),
      };
    default:
      return state;
  }
};

export default function EducationBlock() {
  const { state, dispatch } = useResumeContext();
  const [show, setShow] = useState(false);

  const remove = (order: Order<Education>) =>
    dispatch({ action: "education", value: state.resume.education.filter((e) => e === order) });

  const toggle = () => setShow(!show);

  const add = (item: Education) => {
    const order = { order: state.resume.education.length + 1, visible: true, value: item };
    dispatch({ action: "education", value: [...state.resume.education, order] });
  };

  return (
    <div className="mt-7">
      <h1>Education</h1>
      <div>
        {state.resume.education
          .sort((a, b) => a.order - b.order)
          .map((education, index) => {
            const sDate = education.value.startDate.toLocaleString("pt-BR", {
              year: "numeric",
              month: "long",
            });
            const eDate =
              education.value.endDate?.toLocaleString("pt-BR", {
                year: "numeric",
                month: "long",
              }) ?? "Present";
            return (
              <Tile key={index} order={education} remove={(order) => remove(order)}>
                <p className="block">{`${education.value.degree} ${education.value.school}`}</p>
                <p className="block">{`${sDate} - ${eDate}`}</p>
              </Tile>
            );
          })}
      </div>
      <div
        onClick={toggle}
        className="flex items-center ml-3 space-x-2 text-blue-500 transition cursor-pointer hover:text-blue-600"
      >
        <Add />
        <span>Add one more educational degree</span>
      </div>
      <EducationModal isOpen={show} onClose={toggle} add={(item) => add(item)} />
    </div>
  );
}
function EducationModal({ isOpen, onClose, add }: EducationModalProps) {
  if (!isOpen) return null;

  const [state, dispatch] = useReducer(reducer, {});

  const change = (name: Action, value: ChangeEvent<HTMLInputElement>) => {
    dispatch({ action: name, value: value.currentTarget.value });
  };

  const submit = () => {
    // validation
    add(state as Education);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Education">
      <div className="mb-6">
        <Label htmlFor="school">School</Label>
        <Input name="school" className="mb-4" onChange={(value) => change(Action.school, value)} />
        <Label htmlFor="degree">Degree</Label>
        <Input name="degree" className="mb-4" onChange={(value) => change(Action.degree, value)} />
        <div className="flex mb-4 space-x-6">
          <div className="w-full">
            <Label htmlFor="school_start_date">Start Date</Label>
            <Input
              name="school_start_date"
              placeholder="MM/YYYY"
              onChange={(value) => change(Action.startDate, value)}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="school_end_date">End Date</Label>
            <Input name="school_end_date" placeholder="MM/YYYY" onChange={(value) => change(Action.endDate, value)} />
          </div>
        </div>
        <Label htmlFor="school_city">City</Label>
        <Input name="school_city" className="mb-4" />
        <Label htmlFor="school_description">Description</Label>
        {/* add a wyswyg component */}
        <div className="block">
          <TextAreaEditor
            value={state.description ?? ""}
            setValue={(value) => dispatch({ action: Action.description, value })}
          />
        </div>
        <small>Recruiter tip: tell a story and keep your description under 200 and 300 characters</small>
      </div>
      <button onClick={submit} className="w-full py-3 text-white bg-blue-400 rounded-md">
        Done
      </button>
    </Modal>
  );
}
