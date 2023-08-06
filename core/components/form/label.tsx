interface LabelProps {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Label(props: LabelProps) {
  return (
    <label {...props} className={`capitalize text-sm block mb-2 mt-3 ${props.className}`}>
      {props.children}
    </label>
  );
}
