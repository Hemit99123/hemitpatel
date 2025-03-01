import { create } from "zustand";

export type ViewType = "world" | "persoanlity" | "coping" | "skills"

interface CharacterState {
  type: ViewType;
  setType: (type: ViewType) => void;  // Fixed typo here
}

export const useViewTypeStore = create<CharacterState>((set) => ({
  type: "world",
  setType: (type: ViewType) =>
    set({
      type,
    }),
}));
