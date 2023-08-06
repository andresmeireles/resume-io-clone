import Input from "@/core/components/form/input";
import Label from "@/core/components/form/label";
import Modal from "./modal";
import { ChangeEvent, useState } from "react";
import TextAreaEditor from "@/core/components/form/text-area-editor";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Education, Order, TileProps } from "@/types";
import { Add } from "@/core/icons/add";
import { DraggableList } from "./draggable_list";
import { IMaskInput } from "react-imask";
import { formatDateToFormat, generateRandomString, validateDateInput } from "../api/utils";

interface EducationForm {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  city: string;
  description: string;
}

export default function EducationBlock() {
  const { state, dispatch } = useResumeContext();
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  const add = (item: Order<Education>) => {
    const order = { ...item, order: state.resume.education.length + 1, hash: generateRandomString(6) };
    dispatch({ action: "education", value: [...state.resume.education, order] });
  };

  const reOrder = (order: Order<Education>[], index: number, newIndex: number) => {
    const reOrdered = state.reorder(order, index, newIndex);
    dispatch({ action: "education", value: reOrdered });
  };

  return (
    <div className="mt-7">
      <h1>Education</h1>
      <DraggableList list={state.resume.education} child={EducationTile} type="education" reOrder={reOrder} />
      <div
        onClick={toggle}
        className="flex items-center ml-3 space-x-2 text-blue-500 transition cursor-pointer hover:text-blue-600"
      >
        <Add />
        <span>Add one more educational degree</span>
      </div>
      <EducationModal isOpen={show} onClose={toggle} done={(item) => add(item)} />
    </div>
  );
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  degreeName?: string;
  done: (e: Order<Education>) => void;
  education?: Order<Education>;
}

function EducationTile(props: TileProps<Education>) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(1);
  const open = () => setShow(true);
  const close = () => {
    console.log(state.resume.education);
    setKey((prevKey) => prevKey + 1);
    setShow(!show);
  };

  const { state, dispatch } = useResumeContext();

  const { order } = props;

  const remove = (order: Order<Education>) => {
    dispatch({ action: "education", value: state.resume.education.filter((e) => e.order !== order.order) });
  };

  const sDate = order.value.startDate.toLocaleString("pt-BR", { year: "numeric", month: "long" });
  const eDate = order.value.endDate?.toLocaleString("pt-BR", { year: "numeric", month: "long" }) ?? "Present";

  const done = (item: Order<Education>) => {
    const r = state.resume.education.filter((e) => e.order !== order.order);
    dispatch({ action: "education", value: [...r, item] });
  };

  return (
    <>
      <Tile className="w-full hover:text-blue-500" order={order} remove={remove} onClick={open}>
        <p className="block">{`${order.value.degree} in ${order.value.school}`}</p>
        <p className="block">{`${sDate} - ${eDate}`}</p>
      </Tile>
      <EducationModal key={key} isOpen={show} education={order} onClose={close} done={done} />
    </>
  );
}

function EducationModal({ isOpen, onClose, done, education }: EducationModalProps) {
  const [state, setState] = useState<EducationForm>({
    school: education?.value.school ?? "",
    degree: education?.value.degree ?? "",
    startDate: formatDateToFormat(education?.value.startDate),
    endDate: formatDateToFormat(education?.value.endDate),
    city: education?.value.city ?? "",
    description: education?.value.description ?? "",
  });
  const [error, setError] = useState<string[]>([]);

  const change = (action: keyof EducationForm, value: ChangeEvent<HTMLInputElement> | string) => {
    let v: string;
    if (typeof value === "string") {
      v = value;
    } else {
      v = value.currentTarget.value;
    }

    setState({ ...state, [action]: v });
  };

  const addError = (err: keyof EducationForm) => setError([...error, err]);
  const cleanError = (err: keyof EducationForm) => setError(error.filter((e) => e !== err));
  const hasError = (err: string) => error.includes(err);

  const submit = () => {
    setError([]);
    if ((state.school?.trim().length ?? 0) < 3) {
      addError("school");
      return;
    }
    if ((state.degree?.trim().length ?? 0) < 3) {
      addError("degree");
      return;
    }
    if (state.startDate === undefined) {
      addError("startDate");
      return;
    }

    const eDate =
      state.endDate !== undefined && validateDateInput(state.endDate) ? new Date(`01/${state.endDate}`) : undefined;

    const data = { ...state, startDate: new Date(`01/${state.startDate}`), endDate: eDate };
    const order = {
      order: education?.order ?? 0,
      visible: education?.visible ?? true,
      hash: education?.hash ?? "",
      value: data as Education,
    };
    done(order);
    onClose();
    setState({ school: "", degree: "", startDate: "", endDate: "", city: "", description: "" });
  };

  return (
    isOpen && (
      <Modal isOpen={isOpen} onClose={onClose} title="Education">
        <div className="mb-6">
          <Label htmlFor="school">School</Label>
          <Input
            name="school"
            value={state.school}
            className={`mb-4 ${hasError("school") ? "border border-red-400" : ""}`}
            onChange={(value) => change("school", value)}
          />
          <p className={`${hasError("school") ? "block" : "hidden"} text-pink-500`}>Invalid Field</p>

          <Label htmlFor="degree">Degree</Label>
          <Input
            name="degree"
            value={state.degree}
            className={`mb-4 ${hasError("degree") ? "border border-red-400" : ""}`}
            onChange={(value) => change("degree", value)}
          />
          <p className={`${hasError("degree") ? "block" : "hidden"} text-pink-500`}>Invalid Field</p>

          <div className="flex mb-4 space-x-6">
            <div className="w-full">
              <Label htmlFor="school_start_date">Start Date</Label>
              <IMaskInput
                mask={"00/0000"}
                className={`border ${
                  hasError("startDate") ? "border-red-500" : ""
                } w-full px-3 py-2 transition duration-200 border-b-2 rounded-md outline-none bg-slate-100 border-slate-100 focus:border-blue-600`}
                value={state.startDate ?? ""}
                placeholder="MM/YYYY"
                onAccept={(value) => change("startDate", value)}
                onBlur={(value) => {
                  const val = value.currentTarget.value;
                  if (val === "") return;
                  const valid = validateDateInput(val);
                  const containsError = hasError("startDate");
                  if (!valid && !containsError) {
                    addError("startDate");
                  }
                  if (valid && containsError) {
                    cleanError("startDate");
                  }
                }}
              />
              <p className={`${hasError("startDate") ? "block" : "hidden"} text-pink-500`}>Invalid Field</p>
            </div>
            <div className="w-full">
              <Label htmlFor="school_end_date">End Date</Label>
              <IMaskInput
                mask={"00/0000"}
                className={`border ${
                  hasError("startDate") ? "border-red-500" : ""
                } w-full px-3 py-2 transition duration-200 border-b-2 rounded-md outline-none bg-slate-100 border-slate-100 focus:border-blue-600`}
                value={state.endDate ?? ""}
                placeholder="MM/YYYY"
                onAccept={(value) => change("endDate", value)}
                onBlur={(value) => {
                  const val = value.currentTarget.value;
                  if (val === "") return;
                  const valid = validateDateInput(val);
                  const containsError = hasError("endDate");
                  if (!valid && !containsError) {
                    addError("endDate");
                  }
                  if (valid && containsError) {
                    cleanError("endDate");
                  }
                }}
              />
            </div>
          </div>
          <Label htmlFor="school_city">City</Label>
          <Input value={state.city} name="school_city" className="mb-4" onChange={(value) => change("city", value)} />
          <Label htmlFor="school_description">Description</Label>
          <div className="block">
            <TextAreaEditor value={state.description ?? ""} setValue={(value) => change("description", value)} />
          </div>
          <button onClick={submit} className="w-full py-3 text-white bg-blue-400 rounded-md">
            Done
          </button>
        </div>
      </Modal>
    )
  );
}
