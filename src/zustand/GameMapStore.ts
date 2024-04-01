import { create } from "zustand";
import {
  MapBoundaries,
  MapEvents,
  MapKeys,
  MapWarps,
} from "../types/GameMap/types";
import masterMapObject from "../maps/masterMapObject";
import { Npc, TreasureChest } from "../types/Entities/types";
type MapStore = {
  mapSource: string[];
  npcs: Npc[];
  chests: TreasureChest[];
  preventCameraMove: boolean;
  mapWidth: number;
  mapHeight: number;
  warps: MapWarps;
  boundaries: MapBoundaries;
  song: any;
  mapEvents: MapEvents;
  mapName: string | null;

  loadMap: (mapToLoad: MapKeys) => void;
  updateNpc: (id: number, newNpc: Npc) => void;
  updateChest: (id: number, newChest: TreasureChest) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  mapSource: [],
  npcs: [],
  chests: [],
  preventCameraMove: false,
  mapWidth: 0,
  mapHeight: 0,
  warps: {},
  boundaries: {},
  song: null,
  mapEvents: {},
  mapName: null,

  loadMap: (mapKey: MapKeys) => {
    const mapToLoad = masterMapObject[mapKey];
    set({
      mapSource: mapToLoad.mapSource,
      npcs: mapToLoad.npcs,
      chests: mapToLoad.chests,
      preventCameraMove: mapToLoad.preventCameraMove,
      mapWidth: mapToLoad.mapWidth,
      mapHeight: mapToLoad.mapHeight,
      warps: mapToLoad.warps,
      boundaries: mapToLoad.boundaries,
      song: mapToLoad.song,
      mapEvents: mapToLoad.events,
      mapName: mapToLoad.mapName,
    });
  },
  updateNpc: (id: number, newNpc: Npc) => {
    set(({ npcs }) => {
      const newNpcs = [...npcs];
      const newNpcsWithOldNpcRemoved = newNpcs.filter(
        (newNpc) => newNpc.id !== id
      );

      newNpcsWithOldNpcRemoved.push(newNpc);
      return {
        npcs: newNpcsWithOldNpcRemoved,
      };
    });
  },
  updateChest: (id: number, newChest: TreasureChest) => {
    set(({ chests }) => {
      const newChests = [...chests];
      const newChestsWithOldNpcRemoved = newChests.filter(
        (newChest) => newChest.id !== id
      );

      newChestsWithOldNpcRemoved.push(newChest);
      return {
        chests: newChestsWithOldNpcRemoved,
      };
    });
  },
}));
