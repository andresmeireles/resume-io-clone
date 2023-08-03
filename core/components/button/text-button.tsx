import { MouseEventHandler } from "react";

interface TextButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export default function TextButton(props: TextButtonProps) {
  const { children } = props;
  return (
    <span
      onClick={props.onClick}
      className={`text-blue-400 cursor-pointer hover:text-blue-600 transition block ${props.className}`}
    >
      {children}
    </span>
  );
}
