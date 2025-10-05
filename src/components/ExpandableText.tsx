import { useState } from "react";
import Button from "./Button";

interface Props {
  children: string;
  maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: Props) => {
  const [state, setState] = useState(false);
  let label = state ? "Less" : "More";
  let endChar = state ? children.length : maxChars;
  return (
    <>
      <p>
        {children.slice(0, endChar)}
        {!state && " ..."}
        <Button onClick={() => setState(!state)} optionalClass="mx-2">
          {label}
        </Button>
      </p>
    </>
  );
};

export default ExpandableText;
