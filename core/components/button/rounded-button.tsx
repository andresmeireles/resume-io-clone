import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function RoundedButton(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  const { children } = props;

  return (
    <>
      <button
        {...props}
        className={`p-3 rounded-full hover:animate-pulse ${props.className}`}
      >
        {children}
      </button>
    </>
  );
}
