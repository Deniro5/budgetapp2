import { useEffect, useRef, useState } from "react";
import { useMapStore } from "../../zustand/GameMapStore";
import { Npc, SpriteDirections } from "../../types/Entities/types";
import { cloneDeep } from "../../utils/UtilFunctions";
import useMapUtils from "../../utils/useMapUtils";
import { useOverworldStore } from "../../zustand/OverworldStore";

type UseNpcMovementProps = {
  npc: Npc;
};

const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

const useNpcMovement = ({ npc }: UseNpcMovementProps) => {
  const { updateNpc } = useMapStore();
  const { isFrozen } = useOverworldStore();
  const { spaceIsOccupied, isPlayerAtPosition } = useMapUtils();

  const [movementInterval, setMovementInterval] =
    useState<NodeJS.Timeout | null>(null);

  const oldPositionX = useRef<number>(npc.positionX);
  const oldPositionY = useRef<number>(npc.positionY);

  useEffect(() => {
    //stop npc from moving when isFrozen
    if (!isFrozen || !movementInterval) return;

    clearInterval(movementInterval);
    setMovementInterval(null);
  }, [isFrozen]);

  useEffect(() => {
    //move the npc if they can and screen isnt frozen

    if (!npc.canMove || isFrozen) return;

    console.log(movementInterval);

    const clearAndStartInterval = () => {
      if (movementInterval) {
        clearInterval(movementInterval);
      }

      const newMovementInterval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 4);
        const direction = directions[randomNumber];
        moveNpc(direction);
      }, npc.movementInterval);

      setMovementInterval(newMovementInterval);
    };

    if (
      !movementInterval ||
      oldPositionX.current !== npc.positionX ||
      oldPositionY.current !== npc.positionY
    ) {
      oldPositionX.current = npc.positionX;
      oldPositionY.current = npc.positionY;
      clearAndStartInterval();
    }

    return () => {
      if (!movementInterval) return;
      clearInterval(movementInterval);
      setMovementInterval(movementInterval);
    };
  }, [npc.positionX, npc.positionY, isFrozen]);

  //----------helper functions----------------

  const moveIsValid = (newPositionX: number, newPositionY: number) =>
    !spaceIsOccupied(newPositionX, newPositionY) &&
    !isPlayerAtPosition(newPositionX, newPositionY);

  //---------------------------

  const moveNpc = (direction: string) => {
    const newNpc = cloneDeep(npc);
    let newDirection = npc.direction;
    let newFrame = npc.frame;
    let newPositionX = npc.positionX;
    let newPositionY = npc.positionY;
    let newCurrentSprite = npc.currentSprite;
    if (direction === "ArrowUp") {
      if (!moveIsValid(npc.positionX, npc.positionY - 1)) return;
      newDirection = SpriteDirections.Back;
      newPositionY = npc.positionY - 1;
    } else if (direction === "ArrowDown") {
      if (!moveIsValid(npc.positionX, npc.positionY + 1)) return;
      newDirection = SpriteDirections.Forward;
      newPositionY = npc.positionY + 1;
    } else if (direction === "ArrowLeft") {
      if (!moveIsValid(npc.positionX - 1, npc.positionY)) return;
      newDirection = SpriteDirections.Left;
      newPositionX = npc.positionX - 1;
    } else if (direction === "ArrowRight") {
      if (!moveIsValid(npc.positionX + 1, npc.positionY)) return;
      newDirection = SpriteDirections.Right;
      newPositionX = npc.positionX + 1;
    } else {
      return;
    }
    newCurrentSprite = npc.sprites[newDirection][newFrame];
    const newNpcObject = {
      ...newNpc,
      direction: newDirection,
      frame: 0,
      positionX: newPositionX,
      positionY: newPositionY,
      currentSprite: newCurrentSprite,
    };
    updateNpc(npc.id, newNpcObject);
  };

  return { moveNpc };
};

export default useNpcMovement;
