import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ className = "", ...props }: SearchInputProps) {
  return (
    <div className={`relative mb-6 ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="size-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="block w-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 pl-12 text-[16px] text-foreground placeholder-muted-foreground outline-none transition-colors duration-300 focus:border-primary focus:bg-white/[0.04]"
        {...props}
      />
    </div>
  );
}
