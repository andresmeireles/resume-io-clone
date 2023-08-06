import { DotsThree } from "@/core/icons/dots-three";
import { EyeFill } from "@/core/icons/eye-fill";
import { PhEyeSlashFill as EyeSlashFill } from "@/core/icons/eye-slash-fill";
import { ReactNode, useState } from "react";
import { BottomModal } from "./bottom-modal";
import { Pen } from "@/core/icons/pen";
import { DeleteFilled } from "@/core/icons/delete-filled";
import { Order } from "@/types";

type TileProps = {
  children: ReactNode;
  className?: string;
  order: Order<any>;
  remove: (order: Order<any>) => void;
  onClick: () => void;
};

export default function Tile(props: TileProps) {
  const {
    remove,
    order,
    order: { visible },
    onClick,
    className,
  } = props;
  const [showModal, setShowModal] = useState(false);

  const toggle = () => setShowModal(!showModal);

  const removeOrder = () => {
    remove(order);
    toggle();
  };

  const edit = () => {
    onClick();
    toggle();
  };

  return (
    <div className={`flex items-center justify-between p-3 my-4 border rounded-md border-black-200 ${className}`}>
      <div onClick={onClick} className="w-full cursor-pointer">
        {props.children}
      </div>
      <div className="flex space-x-5">
        {visible ? <EyeFill /> : <EyeSlashFill />}
        <DotsThree className="cursor-pointer" onClick={toggle} />
      </div>
      <BottomModal isOpen={showModal} close={toggle} className="items-end">
        <div className="flex flex-col justify-end w-full mx-2 align-bottom h-min">
          <div className="bg-white divide-y divide-gray-400 rounded-md">
            <button onClick={edit} className="p-3 align-middle transition hover:text-blue-500">
              <Pen className="inline mr-4 text-blue-500" />
              Edit
            </button>
            <button onClick={removeOrder} className="w-full p-3 text-left transition hover:text-blue-500">
              <DeleteFilled className="inline mr-4 text-blue-500" />
              Delete
            </button>
          </div>
          <button
            onClick={toggle}
            className="p-3 my-4 font-medium text-center text-blue-500 bg-white rounded-lg hover:text-blue-400"
          >
            Cancel
          </button>
        </div>
      </BottomModal>
    </div>
  );
}
