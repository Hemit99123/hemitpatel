import { create } from "zustand";

export type ViewType = "world" | "persoanlity" | "coping" | "me" | "skills"

interface CharacterState {
  type;
  setType: (type) => void;  // Fixed typo here
}

export const useViewTypeStore = create((set) => ({
  type: "world",
  setType: (type) =>
    set({
      type,
    }),
}));
