import React from "react";

import { queryParamTrueValue } from "../dictionary";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const Checkbox = ({ id, label, value, onChange }: Props) => {
  return (
    <div className="checkboxWrapper">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        type="checkbox"
        checked={value === queryParamTrueValue}
        onChange={(e) => onChange(e.target.checked ? queryParamTrueValue : "")}
      />
    </div>
  );
};
