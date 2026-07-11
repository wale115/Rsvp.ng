"use client";

export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (val: T) => void;
  name?: string;
}) {
  return (
    <div className="segmented">
      {name && <input type="hidden" name={name} value={value} />}
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={value === opt.value ? "active" : ""}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
