import { SVGProps } from "react";

export function DragVerticalOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        d="M9.5 3a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm0 5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm0 5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm-4-10a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm0 5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm0 5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"
      ></path>
    </svg>
  );
}
