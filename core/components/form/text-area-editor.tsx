import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEdtitorProps {
  value: string;
  setValue: (value: string) => void;
}

export default function TextAreaEditor(props: TextEdtitorProps) {
  return <ReactQuill className="-z-50" theme="snow" value={props.value} onChange={props.setValue} />;
}
