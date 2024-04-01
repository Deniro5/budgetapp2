export interface Item {
  name: string;
  consumable: boolean;
}

export enum GameEventTypes {
  TEXT = "text",
  ITEM = "item",
}

export type TextEvent = {
  type: GameEventTypes.TEXT;
  text: string;
};

export type ItemEvent = {
  type: GameEventTypes.ITEM;
  text: string;
  item: any;
};

export type GameEvent = TextEvent | ItemEvent;
