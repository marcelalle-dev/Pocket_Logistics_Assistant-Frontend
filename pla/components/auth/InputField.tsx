"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  icon?: React.ReactNode;
}

export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  icon,
}: InputFieldProps) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPwd ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-400">
          {label}
          {required && <span className="text-orange-400 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-slate-500 pointer-events-none flex items-center">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className="
            w-full bg-[#162233] border border-[#1e3248] rounded-[9px]
            py-[11px] pl-[38px] pr-10
            text-slate-100 text-sm placeholder:text-slate-600
            outline-none transition-colors duration-150
            focus:border-[#2a4a70] focus:bg-[#1a2a3e]
          "
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
