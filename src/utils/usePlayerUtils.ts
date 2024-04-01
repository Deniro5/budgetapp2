import { SpriteDirections } from "../types/Entities/types";
import { usePlayerStore } from "../zustand/playerStore";

const usePlayerUtils = () => {
  const { player } = usePlayerStore();

  const getPlayerOppositeDirection = () => {
    if (player.direction === SpriteDirections.Back)
      return SpriteDirections.Forward;
    else if (player.direction === SpriteDirections.Forward)
      return SpriteDirections.Back;
    else if (player.direction === SpriteDirections.Left)
      return SpriteDirections.Right;
    else if (player.direction === SpriteDirections.Right)
      return SpriteDirections.Left;
    else {
      return SpriteDirections.Left;
    }
  };

  return { getPlayerOppositeDirection };
};

export default usePlayerUtils;
