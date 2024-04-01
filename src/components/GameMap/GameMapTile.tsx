import styled from "styled-components";
import { MapTile } from "../../types/GameMap/types";
import { useMemo } from "react";

type GameMapTileProps = {
  mapTile: MapTile;
};

const GameMapTile = ({ mapTile }: GameMapTileProps) => {
  const tileContent = useMemo(() => {
    return (
      <StyledGameMapTile>
        <img src={mapTile.tileImage} />
      </StyledGameMapTile>
    );
  }, [mapTile]); // Only recompute when tile changes

  return tileContent;
};

const StyledGameMapTile = styled.div`
  height: 16px;
  width: 16px;
  color: black;
`;

export default GameMapTile;
