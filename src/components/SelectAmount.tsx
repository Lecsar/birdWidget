interface Option {
  label: string;
  value: string;
}

const getOptions = (maxAmount: number) => {
  const result: Option[] = [{ label: "Any", value: "" }];

  for (let i = 1; i <= maxAmount; i++) {
    result.push({ label: String(i), value: String(i) });
  }

  return result;
};

interface Props {
  id: string;
  label: string;
  value?: string;
  maxAmount: number;
  onChange: (value: string) => void;
}

export const SelectAmount = ({
  id,
  label,
  maxAmount,
  value,
  onChange,
}: Props) => {
  const options = getOptions(maxAmount);

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
