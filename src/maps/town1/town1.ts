import {
  Npc,
  SpriteDirections,
  TreasureChest,
} from "../../types/Entities/types";
import {
  MapBoundaries,
  MapEvents,
  MapProperties,
} from "../../types/GameMap/types";
import SpriteSheetToSpriteMap from "../../utils/SpriteExtractor";
import mapImage from "./town1.png";
import mapSong from "./song.mp3";
import SpriteSheet from "../../assets/Player/character-sheet.png";
import {
  GameEventTypes,
  ItemEvent,
  TextEvent,
} from "../../types/Overworld/types";
import openChest from "../../assets/Maps/MapEntities/chestopen.png";
import closedChest from "../../assets/Maps/MapEntities/chestclosed.png";

const initalPlayerSpriteMap = SpriteSheetToSpriteMap({
  spriteSheet: SpriteSheet,
});

const npc1Event1: TextEvent = {
  text: "Hello my name is deniro",
  type: GameEventTypes.TEXT,
};

const npc1Event2: TextEvent = {
  type: GameEventTypes.TEXT,
  text: "Congrats you did it! Press A again to close this window.",
};

const npc2Event1: TextEvent = {
  text: "I'm a big honey pie",
  type: GameEventTypes.TEXT,
};

const npc2Event2: ItemEvent = {
  type: GameEventTypes.ITEM,
  text: "Here take this sword :)",
  item: null,
};

const npc1: Npc = {
  id: 1,
  positionX: 10,
  positionY: 10,
  direction: SpriteDirections.Forward,
  frame: 0,
  health: 0,
  maxHealth: 0,
  energy: 0,
  maxEnergy: 0,
  level: 0,
  name: "Joseph",
  sprites: initalPlayerSpriteMap,
  currentSprite: initalPlayerSpriteMap[SpriteDirections.Forward][0],
  gameEvent: [npc1Event1, npc1Event2],
  canMove: true,
  movementInterval: 8000,
};

const npc2: Npc = {
  id: 2,
  positionX: 5,
  positionY: 13,
  direction: SpriteDirections.Forward,
  frame: 0,
  health: 0,
  maxHealth: 0,
  energy: 0,
  maxEnergy: 0,
  level: 0,
  name: "Jo",
  sprites: initalPlayerSpriteMap,
  currentSprite: initalPlayerSpriteMap[SpriteDirections.Forward][0],
  gameEvent: [npc2Event1, npc2Event2],
  canMove: false,
  movementInterval: 5000,
};

export const town1Npcs = [npc1, npc2];

const boundaries: MapBoundaries = {
  0: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
    14: true,
    15: true,
    16: true,
    17: true,
    18: true,
    19: true,
  },
  1: {
    0: true,
    1: true,
    14: true,
    16: true,
    18: true,
    19: true,
  },
  2: {
    0: true,
    3: true,
    5: true,
    7: true,
    14: true,
    16: true,
    19: true,
  },
  3: {
    0: true,
    11: true,
    14: true,
    16: true,
    19: true,
  },
  4: {
    0: true,
    3: true,
    5: true,
    19: true,
  },
  5: {
    0: true,
    1: true,
    7: true,
    19: true,
  },
  6: {
    0: true,
    3: true,
    5: true,
    10: true,
    17: true,
    19: true,
  },
  7: {
    0: true,
    19: true,
  },
  8: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    19: true,
  },
  9: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    13: true,
    19: true,
  },
  10: {
    0: true,
    18: true,
    19: true,
  },
  11: {
    0: true,
    2: true,
    15: true,
    18: true,
    19: true,
  },
  12: {
    0: true,
    6: true,
    18: true,
    19: true,
  },
  13: {
    0: true,
    18: true,
    19: true,
  },
  14: {
    0: true,
    19: true,
  },
  15: {
    14: true,
    15: true,
    16: true,
    19: true,
  },
  16: {
    14: true,
    15: true,
    16: true,
    19: true,
  },
  17: {
    0: true,
    4: true,
    10: true,
    14: true,
    15: true,
    16: true,
    19: true,
  },
  18: {
    0: true,
    19: true,
  },
  19: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
    14: true,
    15: true,
    16: true,
    17: true,
    18: true,
    19: true,
  },
};

const mapEvent1: TextEvent = {
  type: GameEventTypes.TEXT,
  text: "You walked on the special tile!",
};

const mapEvents: MapEvents = {
  5: {
    5: [mapEvent1],
  },
};

const mapChest1: TreasureChest = {
  id: 1,
  positionX: 2,
  positionY: 4,
  gameEvent: [
    {
      type: GameEventTypes.ITEM,
      text: "You retreived a Wooden Sword!",
      item: null,
    },
  ],
  isOpen: false,
  sprite: closedChest,
  openSprite: openChest,
};

const mapProperties: MapProperties = {
  mapSource: [mapImage],
  npcs: town1Npcs,
  preventCameraMove: true,
  mapWidth: 20,
  mapHeight: 20,
  warps: {},
  boundaries: boundaries,
  song: mapSong,
  events: mapEvents,
  chests: [mapChest1],
  monsters: [],
  signs: [],
  mapName: "Dean Town",
};

export default mapProperties;
