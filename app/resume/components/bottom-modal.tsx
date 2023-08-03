import { MouseEvent, ReactNode } from "react";

export interface BottomModalProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}

export function BottomModal(props: BottomModalProps) {
  const { children, isOpen, close, className } = props;

  const handleOutSideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    isOpen && (
      <div
        className={`fixed inset-0 flex ${className}`}
        onClick={handleOutSideClick}
      >
        {/* the click serves to close modal when backdrop is clickedHa  */}
        <div
          onClick={close}
          className="fixed inset-0 bg-black -z-50 opacity-30"
        ></div>
        {children}
      </div>
    )
  );
}
