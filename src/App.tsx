import { useEffect } from "react";
import GameMap from "./components/GameMap/GameMap";
import { useMapStore } from "./zustand/GameMapStore";
import { MapKeys } from "./types/GameMap/types";

const App = () => {
  const { loadMap, mapSource } = useMapStore();

  useEffect(() => {
    loadMap(MapKeys.TOWN1);
  }, []);

  if (mapSource.length === 0) {
    return <></>;
  }

  return <GameMap />;
};

export default App;
