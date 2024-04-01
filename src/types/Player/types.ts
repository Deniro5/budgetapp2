import { Entity, LivingEntity } from "../Entities/types";
import { Item } from "../Overworld/types";

export type Class = "Warrior" | "Mage" | "Ranger";
export type WearableType =
  | "armor"
  | "earring"
  | "necklace"
  | "ring"
  | "weapon"
  | "shield";

export type BodyPart =
  | "head"
  | "gloves"
  | "legs"
  | "body"
  | "leftEar"
  | "rightEar"
  | "neck"
  | "leftFinger"
  | "rightFinger"
  | "weapon"
  | "shield";

export type Element = "fire" | "water" | "wind" | "earth" | "electric";

export interface Wearable extends Item {
  atk: number;
  def: number;
  hpBuff: number;
  mpBuff: number;
  element: Element;
  luck: number; // a percentage that increases the percent of rare items showing up or something like that
  //crit
  //adoch

  minLevel: number;
  classReq: Class;
  type: WearableType;
  bodyPart: BodyPart;
  upgrades: number;
}

export interface Armor extends Wearable {
  type: "armor";
}

export interface Earring extends Wearable {
  type: "earring";
}

export interface Necklace extends Wearable {
  type: "necklace";
}

export interface Ring extends Wearable {
  type: "ring";
}

export interface Weapon extends Wearable {
  type: "weapon";
}

export interface Shield extends Wearable {
  type: "shield";
}

export interface Player extends LivingEntity {
  money: number;
  exp: number;
  maxExp: number;
  equipment: {
    head: Armor | null;
    gloves: Armor | null;
    legs: Armor | null;
    body: Armor | null;
    leftEar: Earring | null;
    rightEar: Earring | null;
    neck: Necklace | null;
    leftFinger: Ring | null;
    rightFinger: Ring | null;
    weapon: Weapon | null;
    shield: Shield | Weapon | null;
  };
  firstClass: Class;
  secondClass: Class;
}
