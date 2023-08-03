import RoundedButton from "@/core/components/button/rounded-button";
import Input from "@/core/components/form/input";
import Label from "@/core/components/form/label";
import TextAreaEditor from "@/core/components/form/text-area-editor";
import { Add } from "@/core/icons/add";
import Modal from "./modal";
import { useResumeContext } from "../context/resume-context";
import Tile from "./tile";
import { Order, Social } from "@/types";
import { useState } from "react";

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  socialMedia?: string;
}

export default function SocialMediaBlock() {
  const {
    state: { resume },
    dispatch,
  } = useResumeContext();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const remove = (order: Order<Social>) => {
    dispatch({ action: "social", value: resume.social.filter((e) => e !== order) });
  };

  return (
    <div className="mt-7">
      <h1>Web and Social</h1>
      <div>
        {resume.social
          .sort((a, b) => a.order - b.order)
          .map((social, index) => {
            return (
              <Tile key={index} order={social} remove={(order) => remove(order)}>
                <p className="block">{social.value.name}</p>
                <p className="block">{social.value.link}</p>
              </Tile>
            );
          })}
      </div>
      <div
        onClick={toggle}
        className="flex items-center ml-3 space-x-2 text-blue-500 transition cursor-pointer hover:text-blue-600"
      >
        <Add />
        <span>Add your social media or sites</span>
      </div>
      <SocialMediaModal isOpen={show} onClose={toggle} />
    </div>
  );
}

function SocialMediaModal({ isOpen, onClose }: SocialMediaModalProps) {
  if (!isOpen) return null;

  const {
    state: { resume },
    dispatch,
  } = useResumeContext();

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const add = () => {
    const social = { name, link };
    const order = { order: resume.social.length + 1, visible: true, value: social };
    dispatch({ action: "social", value: [...resume.social, order] });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Social Media">
      <div className="mb-6">
        <Label htmlFor="social_media_label">Label</Label>
        <Input
          name="social_media_label"
          className="mb-4"
          value={name}
          onChange={(value) => setName(value.currentTarget.value)}
        />
        <Label htmlFor="social_media_link">Link</Label>
        <Input
          name="social_media_link"
          className="mb-4"
          value={link}
          onChange={(value) => setLink(value.currentTarget.value)}
        />
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
