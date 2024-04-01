import { Monster, Npc, Sign, TreasureChest } from "../Entities/types";
import { GameEvent } from "../Overworld/types";

export type MapPosition = [number, number];

export enum MapKeys {
  TOWN1 = "town1",
}

export type MapWarps = Record<number, Record<number, number>>;
export type MapBoundaries = Record<number, Record<number, true>>;
export type MapEvents = Record<number, Record<number, GameEvent[]>>;

export type MapProperties = {
  mapSource: string[];
  npcs: Npc[];
  chests: TreasureChest[];
  signs: Sign[];
  monsters: Monster[];
  preventCameraMove: boolean;
  mapWidth: number;
  mapHeight: number;
  warps: MapWarps;
  boundaries: MapBoundaries;
  song: any;
  events: MapEvents;
  mapName: string | null;
};
