import { MapKeys, MapProperties } from "../types/GameMap/types";
import Town1MapProperties from "./town1/town1";

const masterMapObject: Record<MapKeys, MapProperties> = {
  town1: Town1MapProperties,
};

export default masterMapObject;
