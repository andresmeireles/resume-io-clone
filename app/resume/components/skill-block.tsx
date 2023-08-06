import { useState } from "react";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Add } from "@/core/icons/add";
import Modal from "./modal";
import Label from "@/core/components/form/label";
import Input from "@/core/components/form/input";
import RadioWithBars from "@/app/resume/components/radio-with-bars";
import { Order, Proficiency, Skill, TileProps } from "@/types.d";
import { DraggableList } from "./draggable_list";
import { generateRandomString } from "../api/utils";

interface SkillBlockProps {
  className?: string;
}

export default function SkillBlock({ className }: SkillBlockProps) {
  const { state, dispatch } = useResumeContext();

  const [show, setShow] = useState(false);
  const [key, setKey] = useState(1);

  const toggle = () => {
    setKey(key + 1);
    setShow(!show);
  };

  const reorder = (order: Order<Skill>[], index: number, newIndex: number) => {
    const reOrdered = state.reorder(order, index, newIndex);
    dispatch({ action: "skill", value: reOrdered });
  };

  const add = (item: Order<Skill>) => {
    const order = { ...item, order: state.resume.skill.length + 1, hash: generateRandomString(6) };
    dispatch({ action: "skill", value: [...state.resume.skill, order] });
  };

  return (
    <div className={`${className}`}>
      <h1>Skills</h1>
      <small>TIP: put only the skills listed on job description, list then as appear on description</small>
      <DraggableList child={SkillTile} list={state.resume.skill} type="skill" reOrder={reorder} />
      <div
        onClick={toggle}
        className="flex items-center ml-3 space-x-2 text-blue-500 transition cursor-pointer hover:text-blue-600"
      >
        <Add />
        <span>Add one or more skill(s)</span>
      </div>
      <SkillModal key={key} isOpen={show} onClose={toggle} done={add} />
    </div>
  );
}

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: Order<Skill>;
  done: (skill: Order<Skill>) => void;
}

function SkillModal({ isOpen, onClose, skill, done }: SkillModalProps) {
  const [name, setName] = useState(skill?.value.name ?? "");
  const [proficiency, setProficiency] = useState<Proficiency>(skill?.value.proficiency ?? Proficiency.novice);
  const [error, setError] = useState<string[]>([]);

  const execute = () => {
    if (!name) {
      setError(["name"]);
      return;
    }

    const order = {
      order: skill?.order ?? 0,
      visible: skill?.visible ?? true,
      value: { name, proficiency } as Skill,
      hash: skill?.hash ?? "",
    };
    done(order);
    onClose();
  };

  return (
    isOpen && (
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
          onClick={execute}
        >
          Done
        </button>
      </Modal>
    )
  );
}

function SkillTile(props: TileProps<Skill>) {
  const [key, setKey] = useState(1);
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => {
    setKey(key + 1);
    setShow(false);
  };
  const { state, dispatch } = useResumeContext();

  const remove = (order: Order<Skill>) => {
    dispatch({ action: "skill", value: state.resume.skill.filter((e) => e !== order) });
  };

  const update = (order: Order<Skill>) => {
    const removedOrder = state.resume.skill.filter((e) => e.order !== order.order);
    dispatch({ action: "skill", value: [...removedOrder, order] });
  };

  return (
    <>
      <Tile className="w-full hover:text-blue-500" order={props.order} remove={remove} onClick={open}>
        <p className="block">{props.order.value.name}</p>
        <p className="block">{props.order.value.proficiency}</p>
      </Tile>
      <SkillModal key={key} isOpen={show} onClose={close} skill={props.order} done={update} />
    </>
  );
}
