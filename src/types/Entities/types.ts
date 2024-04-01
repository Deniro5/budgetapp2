import { GameEvent } from "../Overworld/types";

export enum EntityType {
  Player = "player",
  Npc = "Npc",
  Mob = "Mob",
}

export enum SpriteDirections {
  Forward = "forward",
  Left = "left",
  Right = "right",
  Back = "back",
}

export enum SpritePositions {
  StandForward = "standForward",
  WalkForwardLeft = "walkForwardLeft",
  StandForward2 = "standForward2",
  WalkForwardRight = "walkForwardRight",
  StandLeft = "standLeft",
  WalkLeftLeft = "walkLeftLeft",
  StandLeft2 = "standLeft2",
  WalkLeftRight = "walkLeftRight",
  StandRight = "standRight",
  WalkRightLeft = "walkRightLeft",
  StandRight2 = "standRight2",
  WalkRightRight = "walkRightRight",
  StandBack = "standBack",
  WalkBackLeft = "walkBackLeft",
  StandBack2 = "standBack2",
  WalkBackRight = "walkBackRight",
}

export type SpriteMap = {
  [SpriteDirections.Forward]: JSX.Element[];
  [SpriteDirections.Left]: JSX.Element[];
  [SpriteDirections.Right]: JSX.Element[];
  [SpriteDirections.Back]: JSX.Element[];
};

export interface Entity {
  positionX: number;
  positionY: number;
}

//inanimate

export interface TreasureChest extends Entity {
  id: number;
  gameEvent: GameEvent[];
  isOpen: boolean;
  sprite: string;
  openSprite: string;
}

export interface Sign extends Entity {
  gameEvent: GameEvent[];
  sprite: string;
}

//living

export interface LivingEntity extends Entity {
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  level: number;
  name: string;
  sprites: SpriteMap;
  currentSprite: JSX.Element;
  direction: SpriteDirections;
  frame: number;
}

export interface Monster extends LivingEntity {
  id: number;
  drop: any;
}

export interface Npc extends LivingEntity {
  gameEvent: GameEvent[];
  canMove: boolean;
  id: number;
  movementInterval: number;
}
