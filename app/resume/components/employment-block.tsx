import { useContext, useState } from "react";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Employ, Order } from "@/types";
import { Add } from "@/core/icons/add";
import Modal from "./modal";
import Label from "@/core/components/form/label";
import Input from "@/core/components/form/input";
import TextAreaEditor from "@/core/components/form/text-area-editor";
import { IMaskInput } from "react-imask";

interface EmploymentBlockProps {
  className?: string;
}

export default function EmploymentBlock({ className }: EmploymentBlockProps) {
  const [show, setShow] = useState(false);

  const { state, dispatch } = useResumeContext();

  const add = (order: Order<Employ>) => {
    const o = { ...order, order: state.resume.employ.length + 1 };
    dispatch({ action: "employ", value: [...state.resume.employ, o] });
  };

  return (
    <div className={className}>
      <h1>Employment History</h1>
      <div>
        {state.resume.employ
          .sort((a, b) => a.order - b.order)
          .map((employ, index) => (
            <EmployTile key={index} employ={employ} />
          ))}
      </div>
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

function EmploymentModal({ isOpen, onClose, doneFunction, employ }: ModalProps) {
  if (!isOpen) return null;

  const [job, setJob] = useState(employ?.value.job ?? "");
  const [employer, setEmployer] = useState(employ?.value.company ?? "");
  const [start, setStart] = useState(employ?.value.startDate.toDateString() ?? "");
  const [end, setEnd] = useState(employ?.value.endDate?.toDateString() ?? "");
  const [city, setCity] = useState(employ?.value.city ?? "");
  const [description, setDescription] = useState(employ?.value.description ?? "");
  const [error, setError] = useState<string[]>([]);

  const add = () => {
    if (error.length !== 0) return;
    if (job.trim().length === 0) {
      setError([...error, "job"]);
      return;
    }
    if (employer.trim().length === 0) {
      setError([...error, "employer"]);
      return;
    }
    if (!validateDateInput(start)) {
      setError([...error, "start_date"]);
      return;
    }
    const sDate = new Date(`01/${start}`);
    const eDate = validateDateInput(end) ? new Date(`01/${end}`) : undefined;
    const e = {
      job: job,
      company: employer,
      startDate: sDate,
      endDate: eDate,
      city: city,
      description: description,
    };
    doneFunction({ order: employ?.order ?? 1, visible: true, value: e });
    onClose();
  };

  const validateDateInput = (input: string) => {
    const pattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    return pattern.test(input);
  };

  const containsError = (err: string) => error.includes(err);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Employment">
      <div className="mb-6">
        <Label htmlFor="job_title">Job Title</Label>
        <Input
          name="job_title"
          value={job}
          className={`mb-4 border ${containsError("job") ? "border-red-500" : ""}`}
          onChange={(value) => setJob(value.currentTarget.value)}
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
          value={employer}
          className={`mb-4 border ${containsError("employer") ? "border-red-500" : ""}`}
          onChange={(value) => setEmployer(value.currentTarget.value)}
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
              value={start}
              placeholder="MM/YYYY"
              onAccept={(value) => setStart(value)}
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
              value={end}
              placeholder="MM/YYYY"
              onAccept={(value) => setEnd(value)}
            />
          </div>
        </div>
        <Label htmlFor="city">City</Label>
        <Input name="city" className="mb-4" value={city} onChange={(value) => setCity(value.currentTarget.value)} />
        <Label htmlFor="description">Description</Label>
        <div className="block">
          <TextAreaEditor value={description} setValue={setDescription} />
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
  );
}

interface EmployTileProps {
  employ: Order<Employ>;
}

function EmployTile({ employ }: EmployTileProps) {
  const { state, dispatch } = useResumeContext();
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  const remove = (order: Order<Employ>) => {
    dispatch({ action: "employ", value: state.resume.employ.filter((e) => e !== order) });
  };

  const update = (e: Order<Employ>) => {
    const removedOrder = state.resume.employ.filter((e) => e.order !== e.order);
    dispatch({ action: "employ", value: [...removedOrder, e] });
  };

  const sDate = employ.value.startDate.toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
  });

  const eDate =
    employ.value.endDate?.toLocaleString("pt-BR", {
      year: "numeric",
      month: "long",
    }) ?? "Present";

  return (
    <>
      <Tile order={employ} onClick={toggle} remove={(employ) => remove(employ)}>
        <p className="block">{`${employ.value.job} em ${employ.value.company}`}</p>
        <p className="block">{`${sDate} - ${eDate}`}</p>
      </Tile>
      <EmploymentModal isOpen={show} onClose={toggle} employ={employ} doneFunction={update} />
    </>
  );
}
