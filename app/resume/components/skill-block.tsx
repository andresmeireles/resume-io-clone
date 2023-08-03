import { useState } from "react";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Add } from "@/core/icons/add";
import Modal from "./modal";
import Label from "@/core/components/form/label";
import Input from "@/core/components/form/input";
import RadioWithBars from "@/app/resume/components/radio-with-bars";
import { Order, Proficiency, Skill } from "@/types.d";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: string;
}

interface SkillBlockProps {
  className?: string;
}

export default function SkillBlock({ className }: SkillBlockProps) {
  const {
    state: { resume },
    dispatch,
  } = useResumeContext();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const remove = (order: Order<Skill>) => {
    dispatch({ action: "skill", value: resume.skill.filter((e) => e !== order) });
  };

  return (
    <div className={`${className}`}>
      <h1>Skills</h1>
      <small>TIP: put only the skills listed on job description, list then as appear on description</small>
      <div>
        {resume.skill
          .sort((a, b) => a.order - b.order)
          .map((skill, index) => {
            return (
              <Tile key={index} order={skill} remove={(skill) => remove(skill)}>
                <p className="block">{skill.value.name}</p>
                <p className="block">{skill.value.proficiency}</p>
              </Tile>
            );
          })}
      </div>
      <div
        onClick={toggle}
        className="flex items-center ml-3 space-x-2 text-blue-500 transition cursor-pointer hover:text-blue-600"
      >
        <Add />
        <span>Add one or more skill(s)</span>
      </div>
      <SkillModal isOpen={show} onClose={toggle} />
    </div>
  );
}

function SkillModal({ isOpen, onClose }: SkillModalProps) {
  if (!isOpen) return null;

  const { state, dispatch } = useResumeContext();

  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState<Proficiency>(Proficiency.beginner);
  const [error, setError] = useState<string[]>([]);

  const add = () => {
    if (!name) {
      setError(["name"]);
      return;
    }

    const skill = { name, proficiency };
    const order = {
      order: state.resume.skill.length + 1,
      visible: true,
      value: skill,
    };

    const updatedSkills = [...state.resume.skill, order];
    dispatch({ action: "skill", value: updatedSkills });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Skill">
      <div className="mb-6">
        <Label htmlFor="skill">Skill</Label>
        <Input
          name="skill"
          className={`mb-4 border ${error.includes("name") ? "border-red-500" : ""}`}
          value={name}
          onChange={(value) => setName(value.currentTarget.value)}
        />
        <p className={`${error.includes("name") ? "" : "invisible"} text-sm text-pink-600`}>Please provide a name</p>
        <Label htmlFor="social_media_link">Level - {proficiency.valueOf()}</Label>
        <RadioWithBars setProficiency={setProficiency} proficiency={proficiency} />
      </div>
      <button
        className="w-full px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={add}
      >
        Done
      </button>
    </Modal>
  );
}
