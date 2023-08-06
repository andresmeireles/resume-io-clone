import { useState } from "react";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Employ, Order, TileProps } from "@/types";
import { Add } from "@/core/icons/add";
import Modal from "./modal";
import Label from "@/core/components/form/label";
import Input from "@/core/components/form/input";
import TextAreaEditor from "@/core/components/form/text-area-editor";
import { IMaskInput } from "react-imask";
import { DraggableList } from "./draggable_list";
import { formatDateToFormat, generateRandomString, validateDateInput } from "../api/utils";

interface EmploymentBlockProps {
  className?: string;
}

export default function EmploymentBlock({ className }: EmploymentBlockProps) {
  const [show, setShow] = useState(false);

  const { state, dispatch } = useResumeContext();

  const add = (order: Order<Employ>) => {
    const o = { ...order, order: state.resume.employ.length + 1, hash: generateRandomString(6) };
    dispatch({ action: "employ", value: [...state.resume.employ, o] });
  };

  const updateOrder = (order: Order<Employ>[], index: number, newIndex: number) => {
    const reOrdered = state.reorder(order, index, newIndex);
    dispatch({ action: "employ", value: reOrdered });
  };

  return (
    <div className={`${className} transition-all`}>
      <h1>Employment History</h1>
      <DraggableList list={state.resume.employ} child={EmployTile} type="employ" reOrder={updateOrder} />
      <div
        onClick={() => setShow(true)}
        className="flex items-center ml-3 space-x-2 text-blue-500 transition cursor-pointer hover:text-blue-600"
      >
        <Add />
        <span>Add one more employment</span>
      </div>
      <EmploymentModal isOpen={show} onClose={() => setShow(false)} doneFunction={(employ) => add(employ)} />
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  doneFunction: (employ: Order<Employ>) => void;
  employ?: Order<Employ>;
}

interface FormData {
  job: string;
  employer: string;
  startDate: string;
  endDate: string;
  city: string;
  description: string;
}

function EmploymentModal({ isOpen, onClose, doneFunction, employ }: ModalProps) {
  const [formData, setFormData] = useState({
    job: employ?.value.job ?? "",
    employer: employ?.value.company ?? "",
    startDate: formatDateToFormat(employ?.value.startDate),
    endDate: formatDateToFormat(employ?.value.endDate),
    city: employ?.value.city ?? "",
    description: employ?.value.description ?? "",
  });

  const setData = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const [error, setError] = useState<string[]>([]);

  const add = () => {
    if (error.length !== 0) return;
    if (formData.job.trim().length === 0) {
      setError([...error, "job"]);
      return;
    }
    if (formData.employer.trim().length === 0) {
      setError([...error, "employer"]);
      return;
    }
    if (!validateDateInput(formData.startDate)) {
      setError([...error, "start_date"]);
      return;
    }

    const sDate = new Date(`01/${formData.startDate}`);
    const eDate = validateDateInput(formData.endDate) ? new Date(`01/${formData.endDate}`) : undefined;
    const e = {
      job: formData.job,
      company: formData.employer,
      startDate: sDate,
      endDate: eDate,
      city: formData.city,
      description: formData.description,
    };

    doneFunction({ order: employ?.order ?? 1, visible: true, value: e, hash: "" });
    onClose();
    setFormData({ job: "", employer: "", startDate: "", endDate: "", city: "", description: "" });
  };

  const containsError = (err: string) => error.includes(err);

  return (
    isOpen && (
      <Modal isOpen={isOpen} onClose={onClose} title="Employment">
        <div className="mb-6">
          <Label htmlFor="job_title">Job Title</Label>
          <Input
            name="job_title"
            value={formData.job}
            className={`mb-4 border ${containsError("job") ? "border-red-500" : ""}`}
            onChange={(value) => setData("job", value.currentTarget.value)}
            onBlur={(value) => {
              const valid = value.currentTarget.value.trim().length !== 0;
              const hasError = containsError("job");
              if (!valid && !hasError) {
                setError([...error, "job"]);
              }
              if (valid && hasError) {
                setError(error.filter((e) => e !== "job"));
              }
            }}
          />
          <p className={`${error.includes("job") ? "" : "invisible"} text-sm text-pink-600`}>Invalid Title</p>
          <Label htmlFor="employer">Employer</Label>
          <Input
            name="employer"
            value={formData.employer}
            className={`mb-4 ${containsError("employer") ? "border border-red-500" : ""}`}
            onChange={(value) => setData("employer", value.currentTarget.value)}
            onBlur={(value) => {
              const valid = value.currentTarget.value.trim().length !== 0;
              const hasError = containsError("employer");
              if (!valid && !hasError) {
                setError([...error, "employer"]);
              }
              if (valid && hasError) {
                setError(error.filter((e) => e !== "employer"));
              }
            }}
          />
          <p className={`${error.includes("employer") ? "" : "invisible"} text-sm text-pink-600`}>Invalid Company</p>
          <div className="flex mb-4 space-x-6">
            <div className="w-full">
              <Label htmlFor="employer">Start Date</Label>
              <IMaskInput
                mask={"00/0000"}
                className={`border ${
                  containsError("start_date") ? "border-red-500" : ""
                } w-full px-3 py-2 transition duration-200 border-b-2 rounded-md outline-none bg-slate-100 border-slate-100 focus:border-blue-600`}
                value={formData.startDate}
                placeholder="MM/YYYY"
                onAccept={(value) => setData("startDate", value)}
                onBlur={(value) => {
                  const val = value.currentTarget.value;
                  if (val === "") return;
                  const valid = validateDateInput(val);
                  const hasError = containsError("start_date");
                  if (!valid && !hasError) {
                    setError([...error, "start_date"]);
                  }
                  if (valid && hasError) {
                    setError(error.filter((e) => e !== "start_date"));
                  }
                }}
              />
              <p className={`${error.includes("start_date") ? "" : "invisible"} text-sm text-pink-600`}>Invalid date</p>
            </div>
            <div className="w-full">
              <Label htmlFor="employer">End Date</Label>
              <IMaskInput
                mask={"00/0000"}
                className={`w-full px-3 py-2 transition duration-200 border-b-2 rounded-md outline-none bg-slate-100 border-slate-100 focus:border-blue-600`}
                value={formData.endDate}
                placeholder="MM/YYYY"
                onAccept={(value) => setData("endDate", value)}
              />
            </div>
          </div>
          <Label htmlFor="city">City</Label>
          <Input
            name="city"
            className="mb-4"
            value={formData.city}
            onChange={(value) => setData("city", value.currentTarget.value)}
          />
          <Label htmlFor="description">Description</Label>
          <div className="block">
            <TextAreaEditor value={formData.description} setValue={(set) => setData("description", set)} />
          </div>
          <small>Recruiter tip: tell a story and keep your description under 200 and 300 characters</small>
        </div>
        <button
          className="w-full px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={add}
        >
          Done
        </button>
      </Modal>
    )
  );
}

function EmployTile({ order, className }: TileProps<Employ>) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(1);
  const open = () => setShow(true);
  const close = () => {
    setKey((prevKey) => prevKey + 1);
    setShow(false);
  };
  const { state, dispatch } = useResumeContext();

  const remove = (order: Order<Employ>) => {
    dispatch({ action: "employ", value: state.resume.employ.filter((e) => e !== order) });
  };

  const update = (item: Order<Employ>) => {
    const removedOrder = state.resume.employ.filter((e) => e.order !== item.order);
    dispatch({ action: "employ", value: [...removedOrder, item] });
  };

  const sDate = order.value.startDate.toLocaleString("pt-BR", { year: "numeric", month: "long" });
  const eDate = order.value.endDate?.toLocaleString("pt-BR", { year: "numeric", month: "long" }) ?? "Present";

  return (
    <>
      <Tile className={`w-full ${className}`} order={order} onClick={open} remove={(employ) => remove(employ)}>
        <p className="block">{`${order.value.job} em ${order.value.company}`}</p>
        <p className="block">{`${sDate} - ${eDate}`}</p>
      </Tile>
      <EmploymentModal key={key} isOpen={show} onClose={close} employ={order} doneFunction={update} />
    </>
  );
}
