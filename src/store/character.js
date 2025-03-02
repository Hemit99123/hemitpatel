import { create } from "zustand";

export const useCharacterStore = create((set) => ({
  characterState: "Idle",
  setCharacterState: (characterState) =>
    set({
      characterState,
    }),
}));
