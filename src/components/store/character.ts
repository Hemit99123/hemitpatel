import { create } from "zustand";

interface CharacterState {
  characterState: "Idle" | "Run";
  setCharacterState: (characterState: "Idle" | "Run") => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characterState: "Idle",
  setCharacterState: (characterState) =>
    set({
      characterState,
    }),
}));
