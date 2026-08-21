"use client";

import { useEffect } from "react";
import { useEditMode } from "./EditModeContext";

/**
 * When admin edit mode is open, pause heavy animations
 * to keep the page responsive while editing.
 */
export default function EditMotionPause() {
  const { isEditMode } = useEditMode();

  useEffect(() => {
    const root = document.documentElement;
    if (isEditMode) {
      root.classList.add("ve-editing");
    } else {
      root.classList.remove("ve-editing");
    }
    return () => {
      root.classList.remove("ve-editing");
    };
  }, [isEditMode]);

  return null;
}

