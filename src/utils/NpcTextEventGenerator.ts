import { useMapStore } from "../zustand/GameMapStore";

export const NpcTextEvent = (text: string) => {
  if (!text.length) return;

  const { setIsFrozen, setMapText } = useMapStore();
  setIsFrozen(true);
  setMapText(text);
  // loop through and pass text into mapText for each text
  // await input from user for each
  // at end set mapText to null and isFrozen to false

  //setIsFrozen(false);
};
