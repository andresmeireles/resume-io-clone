import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  const { type, className } = props;
  return (
    <>
      <input
        {...props}
        type={type ?? "text"}
        className={`px-3 py-2 w-full bg-slate-100 
        border-b-2  border-slate-100 focus:border-blue-600 transition duration-200 rounded-md outline-none ${className}`}
      />
    </>
  );
}
