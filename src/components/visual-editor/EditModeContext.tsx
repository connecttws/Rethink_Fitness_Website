"use client";

import { createContext, useContext, useState, useCallback, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { mergeContentWithPatches } from "@/lib/visual-data/setByPath";
import type { VisualContent } from "@/lib/visual-data/loadContent";

class ActiveSectionStore {
  private activeSection: string | null = null;
  private listeners = new Set<() => void>();

  get = () => this.activeSection;
  set = (id: string | null) => {
    if (this.activeSection !== id) {
      this.activeSection = id;
      this.listeners.forEach((l) => l());
    }
  };
  subscribe = (l: () => void) => {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  };
}
export const activeSectionStore = new ActiveSectionStore();

export function useActiveSection() {
  return useSyncExternalStore(activeSectionStore.subscribe, activeSectionStore.get, activeSectionStore.get);
}

export function useIsSectionActive(id: string) {
  return useSyncExternalStore(
    activeSectionStore.subscribe,
    () => activeSectionStore.get() === id,
    () => false
  );
}

type EditModeContextValue = {
  isEditMode: boolean;
  openSection: (id: string) => void;
  closeSection: () => void;
  patch: Record<string, unknown>;
  applyPatch: (key: string, value: unknown) => void;
  visualContent: VisualContent;
  pageSlug: string;
};

const EditModeContext = createContext<EditModeContextValue | null>(null);

export function EditModeProvider({
  children,
  isEditMode,
  visualContent,
  pageSlug = "/",
}: {
  children: ReactNode;
  isEditMode: boolean;
  visualContent: VisualContent;
  pageSlug?: string;
}) {
  const [patch, setPatch] = useState<Record<string, unknown>>({});

  const openSection = useCallback((id: string) => {
    activeSectionStore.set(activeSectionStore.get() === id ? null : id);
  }, []);

  const closeSection = useCallback(() => activeSectionStore.set(null), []);

  const applyPatch = useCallback((key: string, value: unknown) => {
    setPatch((prev) => ({ ...prev, [key]: value }));
  }, []);

  const mergedContent = useMemo(
    () => mergeContentWithPatches(visualContent, patch) as VisualContent,
    [visualContent, patch],
  );

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        openSection,
        closeSection,
        patch,
        applyPatch,
        visualContent: mergedContent,
        pageSlug,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) {
    return {
      isEditMode: false,
      openSection: () => {},
      closeSection: () => {},
      patch: {},
      applyPatch: () => {},
      visualContent: {} as VisualContent,
      pageSlug: "/",
    } satisfies EditModeContextValue;
  }
  return ctx;
}
