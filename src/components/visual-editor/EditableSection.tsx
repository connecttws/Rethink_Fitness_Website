"use client";

import { type ReactNode, type ElementType } from "react";
import { Pencil, X } from "lucide-react";
import { useEditMode, useIsSectionActive } from "./EditModeContext";

type Props = {
  sectionId: string;
  label: string;
  children: ReactNode;
  className?: string;
  toolsClassName?: string;
  as?: ElementType;
  style?: React.CSSProperties;
  id?: string;
};

export function EditableSection({ sectionId, label, children, className = "", toolsClassName = "left-2 top-2", as: Tag = "div", style, id }: Props) {
  const { isEditMode, openSection, closeSection } = useEditMode();
  const isActive = useIsSectionActive(sectionId);
  const isFixed = /\bfixed\b/.test(className);

  if (!isEditMode) {
    return (
      <Tag
        className={`${isFixed ? "" : "relative "} ${className}`}
        style={style}
        id={id}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      style={style}
      className={`group/section ${isFixed ? "" : "relative"} transition-colors duration-200 ${className} ${
        isActive
          ? "ring-2 ring-blue-500"
          : "ring-1 ring-transparent hover:ring-blue-300"
      }`}
    >
      <div className={`absolute z-[100] flex items-center gap-1.5 ${toolsClassName}`}>
        <span className="hidden rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg sm:inline">
          {label}
        </span>

        <button
          aria-label={isActive ? `Close ${label} editor` : `Edit ${label}`}
          className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all active:scale-95 sm:h-8 sm:w-8 ${
            isActive
              ? "bg-blue-600 text-white"
              : "bg-white/95 text-blue-600 ring-1 ring-blue-200"
          }`}
          onClick={() => (isActive ? closeSection() : openSection(sectionId))}
          type="button"
        >
          {isActive ? (
            <X className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </button>

        {isActive && (
          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg sm:hidden">
            {label}
          </span>
        )}
      </div>

      {children}
    </Tag>
  );
}
