import { create } from "zustand";
import { GameEvent } from "../types/Overworld/types";

type OverworldStore = {
  currentEvent: GameEvent[];
  currentEventPointer: number;
  isFrozen: boolean;
  listenForNext: boolean;
  eventText: string | null;

  startEvent: (event: any[]) => void;
  setIsFrozen: (isFrozen: boolean) => void;
  setCurrentEventPointer: (pointer: number) => void;
  setListenForNext: (listenForNext: boolean) => void;
  cleanUpEvent: () => void;
  setEventText: (eventText: string | null) => void;
};

export const useOverworldStore = create<OverworldStore>((set) => ({
  currentEvent: [],
  currentEventPointer: 0,
  isFrozen: false,
  listenForNext: false,
  eventText: null,

  setIsFrozen: (isFrozen: boolean) => {
    set({
      isFrozen: isFrozen,
    });
  },
  startEvent: (event: GameEvent[]) => {
    if (!event.length) return;

    set({
      currentEvent: event,
      currentEventPointer: 0,
    });
  },
  setListenForNext: (listenForNext: boolean) => {
    set({
      listenForNext: listenForNext,
    });
  },
  cleanUpEvent: () => {
    set({
      eventText: null,
      currentEvent: [],
      currentEventPointer: 0,
      isFrozen: false,
      listenForNext: false,
    });
  },
  setCurrentEventPointer: (pointer: number) => {
    set({
      currentEventPointer: pointer,
    });
  },
  setEventText: (eventText: string | null) => {
    set({
      eventText: eventText,
    });
  },
}));
