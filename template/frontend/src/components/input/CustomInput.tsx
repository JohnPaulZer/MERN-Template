import type { InputHTMLAttributes } from "react";

interface CustomInputI extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "suffix"
> {
  label: string;
  type?: string;
  parentClass?: string;
  inputClass?: string;
}

export default function CustomInput({
  parentClass = "",
  label,
  type = "text",
  inputClass = "",
  ...props
}: CustomInputI) {
  return (
    <div className={`flex flex-col gap-1 w-full ${parentClass}`}>
      <label className="text-sm font-medium text-slate-300">{label}</label>

      <input
        type={type}
        className={`
          w-full
          px-4 py-3
          rounded-xl
          bg-white/10
          border border-white/20
          text-white
          placeholder-slate-400
          outline-none
          transition-all duration-200
          focus:ring-2 focus:ring-indigo-500
          focus:border-indigo-500
          ${inputClass}
        `}
        {...props}
      />
    </div>
  );
}
