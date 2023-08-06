import Input from "@/core/components/form/input";
import Label from "@/core/components/form/label";
import { Add } from "@/core/icons/add";
import Modal from "./modal";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Order, Social, TileProps } from "@/types";
import { useState } from "react";
import { DraggableList } from "./draggable_list";
import { generateRandomString } from "../api/utils";

export default function SocialMediaBlock() {
  const { state, dispatch } = useResumeContext();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const reorder = (order: Order<Social>[], index: number, newIndex: number) => {
    const reOrdered = state.reorder(order, index, newIndex);
    dispatch({ action: "social", value: reOrdered });
  };

  const add = (item: Order<Social>) => {
    const order = { ...item, order: state.resume.social.length + 1, hash: generateRandomString(6) };
    dispatch({ action: "social", value: [...state.resume.social, order] });
    console.log(state.resume.social);
  };

  return (
    <div className="mt-7">
      <h1>Web and Social</h1>
      <DraggableList child={SocialTile} list={state.resume.social} type="social" reOrder={reorder} />
      <div
        onClick={toggle}
        className="flex items-center ml-3 space-x-2 text-blue-500 transition cursor-pointer hover:text-blue-600"
      >
        <Add />
        <span>Add your social media or sites</span>
      </div>
      <SocialMediaModal isOpen={show} onClose={toggle} done={add} />
    </div>
  );
}

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  socialMedia?: Order<Social>;
  done: (socialMedia: Order<Social>) => void;
}

function SocialMediaModal({ isOpen, onClose, socialMedia, done }: SocialMediaModalProps) {
  const [name, setName] = useState(socialMedia?.value.name ?? "");
  const [link, setLink] = useState(socialMedia?.value.link ?? "");
  const [error, setError] = useState<string[]>([]);
  const addError = (err: "name" | "link") => setError([...error, err]);
  const hasError = (err: "name" | "link") => error.includes(err);
  const removeError = (err: "name" | "link") => setError(error.filter((e) => e !== err));

  const execute = () => {
    setError([]);
    if (name.trim().length === 0) {
      addError("name");
      return;
    }
    if (link.trim().length === 0) {
      addError("link");
      return;
    }
    const sm = {
      order: socialMedia?.order ?? 0,
      value: { name, link } as Social,
      visible: socialMedia?.visible ?? true,
      hash: socialMedia?.hash ?? "",
    };
    done(sm);
    onClose();
    setLink("");
    setName("");
  };

  return (
    isOpen && (
      <Modal isOpen={isOpen} onClose={onClose} title="Social Media">
        <div className="mb-6">
          <Label htmlFor="social_media_label">Label</Label>
          <Input
            name="social_media_label"
            className={`mb-4 ${hasError("name") ? "border border-red-400" : ""}`}
            value={name}
            onChange={(value) => {
              removeError("name");
              setName(value.currentTarget.value);
            }}
            onBlur={(v) => {
              const name = v.currentTarget.value;
              if (name.trim().length === 0) {
                addError("name");
              }
            }}
          />
          <p className={`text-pink-500 ${hasError("name") ? "block" : "hidden"}`}>Invalid name</p>
          <Label htmlFor="social_media_link">Link</Label>
          <Input
            name="social_media_link"
            className={`mb-4 ${hasError("link") ? "border border-red-400" : ""}`}
            value={link}
            onChange={(value) => {
              removeError("link");
              setLink(value.currentTarget.value);
            }}
            onBlur={(v) => {
              const name = v.currentTarget.value;
              if (name.trim().length === 0) {
                addError("link");
              }
            }}
          />
          <p className={`text-pink-500 ${hasError("link") ? "block" : "hidden"}`}>Invalid link</p>
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

function SocialTile(props: TileProps<Social>) {
  const [key, setKey] = useState(Math.ceil(Math.random() * 100000));
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => {
    setKey(Math.ceil(Math.random() * 100000));
    setShow(false);
  };
  const { state, dispatch } = useResumeContext();

  const remove = (order: Order<Social>) => {
    dispatch({ action: "social", value: state.resume.social.filter((e) => e !== order) });
  };

  const update = (order: Order<Social>) => {
    const removedOrder = state.resume.social.filter((e) => e.order !== order.order);
    dispatch({ action: "social", value: [...removedOrder, order] });
  };

  const { order } = props;

  return (
    <>
      <Tile className="w-full transition hover:text-blue-500" order={order} remove={remove} onClick={open}>
        <p className="block">{order.value.name}</p>
        <p className="block">{order.value.link}</p>
      </Tile>
      <SocialMediaModal key={key} isOpen={show} onClose={close} done={update} socialMedia={order} />
    </>
  );
}
