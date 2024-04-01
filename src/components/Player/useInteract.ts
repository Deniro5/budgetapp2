import {
  GameEvent,
  GameEventTypes,
  TextEvent,
} from "../../types/Overworld/types";
import { useMapStore } from "../../zustand/GameMapStore";

const useInteract = () => {
  const { setMapText, setIsFrozen } = useMapStore();

  const handleInteract = (gameEventArray: GameEvent[]) => {
    gameEventArray.forEach((gameEvent) => {
      if (gameEvent.type === GameEventTypes.TEXT) {
        handleTextEvent(gameEvent);
      }
    });
  };

  const handleTextEvent = (textEvent: TextEvent) => {
    setMapText(textEvent.text);
    setIsFrozen(true);
  };

  return { handleInteract };
};

export default useInteract;
