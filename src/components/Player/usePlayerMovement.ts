import { useState } from "react";
import { usePlayerStore } from "../../zustand/playerStore";
import { useMapStore } from "../../zustand/GameMapStore";
import { SpriteDirections } from "../../types/Entities/types";
import { Player } from "../../types/Player/types";
import { cloneDeep } from "../../utils/UtilFunctions";
import useMapUtils from "../../utils/useMapUtils";
import usePlayerUtils from "../../utils/usePlayerUtils";
import useEvent from "../../utils/useEvent";
import { useOverworldStore } from "../../zustand/OverworldStore";

const usePlayerMovement = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { player, setPlayer } = usePlayerStore();
  const { updateNpc, updateChest } = useMapStore();
  const { isFrozen, listenForNext } = useOverworldStore();

  const {
    spaceIsOccupied,
    getNpcAtPosition,
    getMapEventAtPosition,
    getChestAtPosition,
  } = useMapUtils();
  const { getPlayerOppositeDirection } = usePlayerUtils();
  const { handleStartEvent, nextEvent } = useEvent();

  //----------helper functions----------------
  const getNewFrameHelper = (
    oldDirection: SpriteDirections,
    newDirection: SpriteDirections,
    oldFrame: number
  ) => {
    let newFrame = oldFrame;
    if (oldDirection !== newDirection) return 0;

    if (oldDirection === newDirection) {
      newFrame += 1;
    }
    //check if we have gone back to the first frame in movement
    return newFrame < 4 ? newFrame : 0;
  };

  const moveIsValid = (newPositionX: number, newPositionY: number) =>
    !spaceIsOccupied(newPositionX, newPositionY);

  //---------------------------Movement

  const movePlayer = (direction: string) => {
    const newPlayer = cloneDeep(player);
    let newDirection = player.direction;
    let newFrame = player.frame;
    let newPositionX = player.positionX;
    let newPositionY = player.positionY;
    let newCurrentSprite = player.currentSprite;

    if (direction === "ArrowUp") {
      if (moveIsValid(player.positionX, player.positionY - 1)) {
        newPositionY = player.positionY - 1;
      }
      newDirection = SpriteDirections.Back;
    } else if (direction === "ArrowDown") {
      if (moveIsValid(player.positionX, player.positionY + 1)) {
        newPositionY = player.positionY + 1;
      }
      newDirection = SpriteDirections.Forward;
    } else if (direction === "ArrowLeft") {
      if (moveIsValid(player.positionX - 1, player.positionY)) {
        newPositionX = player.positionX - 1;
        ` ¸`;
      }
      newDirection = SpriteDirections.Left;
    } else if (direction === "ArrowRight") {
      if (moveIsValid(player.positionX + 1, player.positionY)) {
        newPositionX = player.positionX + 1;
      }
      newDirection = SpriteDirections.Right;
    } else {
      return;
    }

    newFrame = getNewFrameHelper(player.direction, newDirection, player.frame);
    newCurrentSprite = player.sprites[newDirection][newFrame];

    const newPlayerObject = {
      ...newPlayer,
      direction: newDirection,
      frame: newFrame,
      positionX: newPositionX,
      positionY: newPositionY,
      currentSprite: newCurrentSprite,
    };

    setPlayer(newPlayerObject);
    listenForStop(newPlayerObject);

    //Run event on map if there is one at this position
    const mapEventAtNewPosition = getMapEventAtPosition(
      newPositionX,
      newPositionY
    );
    if (mapEventAtNewPosition) handleStartEvent(mapEventAtNewPosition);
  };

  const listenForStop = (newPlayer: Player) => {
    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      setPlayer({
        ...newPlayer,
        frame: 0,
        currentSprite: newPlayer.sprites[newPlayer.direction][0],
      });
    }, 150);
    setTimeoutId(id);
  };

  //Interact-----------------------------------

  const interact = () => {
    const facingPositionX =
      player.positionX +
      (player.direction === SpriteDirections.Left ? -1 : 0) +
      (player.direction === SpriteDirections.Right ? 1 : 0);
    const facingPositionY =
      player.positionY +
      (player.direction === SpriteDirections.Forward ? +1 : 0) +
      (player.direction === SpriteDirections.Back ? -1 : 0);

    const npc = getNpcAtPosition(facingPositionX, facingPositionY);
    if (npc) {
      //refactor based on useMapUtils comment
      handleStartEvent(npc.gameEvent);
      //TODO: Move this outta here asap
      const newNpc = cloneDeep(npc);
      const newDirection = getPlayerOppositeDirection();
      const newCurrentSprite = npc.sprites[newDirection][0];
      const newNpcObject = {
        ...newNpc,
        direction: newDirection,
        frame: 0,
        currentSprite: newCurrentSprite,
      };
      updateNpc(npc.id, newNpcObject);
      return;
    }

    const chest = getChestAtPosition(facingPositionX, facingPositionY);
    if (chest && !chest.isOpen) {
      handleStartEvent(chest.gameEvent);
      //TODO: Move this outta here asap
      const newChest = cloneDeep(chest);
      const newNpcObject = {
        ...newChest,
        isOpen: true,
      };
      updateChest(chest.id, newNpcObject);
      return;
    }
  };

  const handleKeyDown = (key: string) => {
    if (key === "a") {
      if (listenForNext) nextEvent();
      else interact();
    }
    if (isFrozen) return;
    if (key.substring(0, 5) === "Arrow") movePlayer(key); //arrow click
  };

  return { handleKeyDown };
};

export default usePlayerMovement;
