import { create } from "zustand";

export const useViewTypeStore = create((set) => ({
  type: "world",
  setType: (type) =>
    set({
      type,
    }),
}));
