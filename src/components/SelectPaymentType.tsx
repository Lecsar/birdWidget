import React from "react";

import { paymentTypeDictionary } from "../dictionary";

const options = [{ label: "Any", value: "" }].concat(
  Object.values(paymentTypeDictionary).map((i) => ({
    label: i.label,
    value: String(i.value),
  }))
);

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const SelectPaymentType = ({ id, label, value, onChange }: Props) => {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
    </div>
  );
};
