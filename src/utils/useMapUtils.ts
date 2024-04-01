import { useMapStore } from "../zustand/GameMapStore";
import { usePlayerStore } from "../zustand/playerStore";

const useMapUtils = () => {
  const { boundaries, npcs, mapHeight, mapWidth, mapEvents, chests } =
    useMapStore();
  const { player } = usePlayerStore();

  //we can add a function here that gets the union of chests npcs monsters signs and then simplify some of this.
  //if we do that in player we can just check once what is in the interact spot and then handle it based on what it is

  const isPlayerAtPosition = (x: number, y: number) =>
    player.positionX === x && player.positionY === y;

  const getNpcAtPosition = (x: number, y: number) => {
    const npc = npcs.find((npc) => npc.positionX === x && npc.positionY === y);
    return npc;
  };

  const getChestAtPosition = (x: number, y: number) => {
    const chest = chests.find(
      (chest) => chest.positionX === x && chest.positionY === y
    );
    return chest;
  };

  //want to change this to entity
  const spaceHasNpc = (x: number, y: number) =>
    npcs.some((npc) => npc.positionX === x && npc.positionY === y);

  const spaceHasChest = (x: number, y: number) =>
    chests.some((chest) => chest.positionX === x && chest.positionY === y);

  const spaceHasEntity = (x: number, y: number) =>
    spaceHasNpc(x, y) || spaceHasChest(x, y);

  const spaceIsBoundary = (x: number, y: number) => boundaries?.[y]?.[x];

  const spaceIsBorder = (x: number, y: number) =>
    mapWidth < 0 || mapHeight < 0 || mapWidth <= x || mapHeight <= y;

  const spaceIsOccupied = (x: number, y: number) =>
    spaceHasEntity(x, y) || spaceIsBoundary(x, y) || spaceIsBorder(x, y);

  const getMapEventAtPosition = (x: number, y: number) => mapEvents?.[y]?.[x];

  return {
    spaceHasNpc,
    spaceIsBoundary,
    spaceIsOccupied,
    getNpcAtPosition,
    isPlayerAtPosition,
    getMapEventAtPosition,
    getChestAtPosition,
  };
};

export default useMapUtils;
