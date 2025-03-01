import { create } from "zustand";

interface CharacterState {
  type: "world" | "personality";
  setType: (type: "world" | "personality") => void;  // Fixed typo here
}

export const useViewTypeStore = create<CharacterState>((set) => ({
  type: "world",
  setType: (type: "world" | "personality") =>
    set({
      type,
    }),
}));
