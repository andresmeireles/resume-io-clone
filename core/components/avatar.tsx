import { Pen } from "../icons/pen";
import { TrashBin } from "../icons/trash-bin";

interface AvatarProps {
  className: string;
}

export default function Avatar(props: AvatarProps) {
  return (
    <div className={props.className}>
      <div className="flex">
        <div className="relative w-12 h-12 overflow-hidden -z-10">
          <img
            className="absolute top-0 left-0 object-cover w-full h-full"
            src="https://www.google.com/logos/google.jpg"
          />
        </div>
        <div className="ml-4">
          <div className="flex space-x-2 font-normal text-blue-500">
            <Pen />
            <span className="text-sm">Edit Photo</span>
          </div>
          <div className="flex space-x-2 font-normal text-slate-500">
            <TrashBin />
            <span className="text-sm">Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}
