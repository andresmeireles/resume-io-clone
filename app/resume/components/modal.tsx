import RoundedButton from "@/core/components/button/rounded-button";
import { Add } from "@/core/icons/add";
import { ArrowBack } from "@/core/icons/arrow-back";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, subtitle, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center xl:overflow-hidden lg:overflow-hidden md:overflow-hidden overflow-y-auto ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div className="w-screen h-full p-6 bg-white rounded-lg ">
        <div className="grid grid-cols-3 mb-4">
          <div>
            <RoundedButton onClick={onClose} className="text-center text-blue-400 bg-blue-100">
              <ArrowBack />
            </RoundedButton>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">{title}</h2>
            <h3 className="text-sm text-slate-400">{subtitle}</h3>
          </div>
          <div></div>
        </div>
        {children}
      </div>
    </div>
  );
}
