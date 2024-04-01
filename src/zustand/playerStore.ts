import { create } from "zustand";
import {
  Armor,
  Earring,
  Necklace,
  Ring,
  Weapon,
  Class,
  Shield,
  Player,
} from "../types/Player/types";
import { SpriteDirections } from "../types/Entities/types";
import SpriteSheetToSpriteMap from "../utils/SpriteExtractor";
import SpriteSheet from "../assets/Player/character-sheet.png";
import { cloneDeep } from "lodash";

const initalPlayerSpriteMap = SpriteSheetToSpriteMap({
  spriteSheet: SpriteSheet,
});

const initialPlayer: Player = {
  positionX: 1,
  positionY: 1,
  direction: SpriteDirections.Forward,
  frame: 0,
  health: 100,
  maxHealth: 100,
  exp: 245,
  maxExp: 1351,
  energy: 100,
  maxEnergy: 100,
  level: 1,
  name: "Dean",
  money: 100,
  equipment: {
    head: null,
    gloves: null,
    legs: null,
    body: null,
    leftEar: null,
    rightEar: null,
    neck: null,
    leftFinger: null,
    rightFinger: null,
    weapon: null,
    shield: null,
  },
  firstClass: "Warrior",
  secondClass: "Ranger",
  sprites: initalPlayerSpriteMap,
  currentSprite: initalPlayerSpriteMap[SpriteDirections.Forward][0],
};

type PlayerStore = {
  player: Player;
  setPlayer: (newplayer: Player) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: initialPlayer,
  setPlayer: (newPlayer: Player) => {
    set(() => {
      return { player: newPlayer };
    });
  },
}));
