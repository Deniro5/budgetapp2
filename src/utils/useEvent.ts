import { useEffect } from "react";
import { GameEvent } from "../types/Overworld/types";
import { useOverworldStore } from "../zustand/OverworldStore";

const useGameEvent = () => {
  const {
    setEventText,
    currentEvent,
    currentEventPointer,
    cleanUpEvent,
    setCurrentEventPointer,
    startEvent,
    setIsFrozen,
    setListenForNext,
  } = useOverworldStore();

  useEffect(() => {
    if (!currentEvent.length) return;
    if (currentEventPointer >= currentEvent.length) {
      cleanUpEvent();
      return;
    }

    const eventStep = currentEvent[currentEventPointer];
    runEvent(eventStep);
  }, [currentEvent, currentEventPointer]);

  const runEvent = (event: GameEvent) => {
    if (event.type === "text") {
      handleTextEvent(event.text);
    } else if (event.type === "item") {
      handleItemEvent(event.text, event.item);
    }
  };

  const handleTextEvent = (text: string) => {
    setEventText(text);
    setIsFrozen(true);
    setListenForNext(true);
  };

  const handleItemEvent = (text: string, item: any) => {
    setEventText(text);
    setIsFrozen(true);
    setListenForNext(true);

    //Add the item to user inventory here
  };

  const handleStartEvent = (gameEventArray: GameEvent[]) => {
    startEvent(gameEventArray);
  };

  const nextEvent = () => {
    setCurrentEventPointer(currentEventPointer + 1);
  };

  return {
    handleStartEvent,
    nextEvent,
  };
};

export default useGameEvent;
