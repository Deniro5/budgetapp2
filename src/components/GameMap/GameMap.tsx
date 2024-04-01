import styled from "styled-components";
import { useMapStore } from "../../zustand/GameMapStore";
import usePlayerMovement from "../Player/usePlayerMovement";
import { useEffect, useMemo, useRef } from "react";
import { usePlayerStore } from "../../zustand/playerStore";
import Player from "../Player/Player";
import UserControls from "./UserControls/UserControls";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NpcComponent from "../NpcComponent/NpcComponent";
import GameMapText from "./GameMapText/GameMapText";
import MusicHandler from "../MusicHandler/MusicHandler";
import ChestComponent from "./ChestComponent/ChestComponent";

const GameMap = () => {
  const { mapSource, preventCameraMove, npcs, mapName, chests } = useMapStore();
  const { player } = usePlayerStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleKeyDown } = usePlayerMovement();

  //-------handles the 'input handler' ---------

  useEffect(() => {
    refocus();
  }, []);

  const refocus = () => {
    inputRef.current?.focus();
  };

  //---------------------------------------------

  //-------handles the map name toast ---------

  useEffect(() => {
    if (mapName) {
      toast(mapName);
    }
  }, [mapName]);

  //----------------------------------------------

  const getMapOffset = (position: number) => {
    let offset = position - 10;
    if (offset < 0) return 0;
    if (offset > 20) return 320;
    return offset * 16;
  };

  const getMapOffsetX = () =>
    preventCameraMove ? 0 : getMapOffset(player.positionX); // maybe memoize
  const getMapOffsetY = () =>
    preventCameraMove ? 0 : getMapOffset(player.positionY); // myabe memoize

  const mapBackground = useMemo(
    () => (
      <div>
        {mapSource.map((mapSection) => (
          <img src={mapSection} />
        ))}
      </div>
    ),
    [mapSource]
  );

  const memoizedNpcs = useMemo(
    () => npcs.map((npc) => <NpcComponent key={npc.name} npc={npc} />),
    [npcs]
  );

  const memoizedChests = useMemo(
    () => chests.map((chest) => <ChestComponent chest={chest} />),
    [chests]
  );

  return (
    <GameMapContainer>
      <StyledKeyboardListener
        type="text"
        onKeyDown={(e) => handleKeyDown(e.key)}
        onBlur={refocus}
        ref={inputRef}
      />
      <Camera>
        <StyledGameMap offsetX={getMapOffsetX()} offsetY={getMapOffsetY()}>
          <StyledToastContainer
            autoClose={3000}
            hideProgressBar
            position="top-left"
            transition={Slide}
            closeButton={false}
          />
          <Player />
          {memoizedNpcs}
          {memoizedChests}
          {mapBackground}
        </StyledGameMap>
        <GameMapText />
      </Camera>
      <UserControls />
      <MusicHandler />
    </GameMapContainer>
  );
};

const StyledToastContainer = styled(ToastContainer)`
  width: 120px;
  height: 2px;
  min-height: unset;
  top: 4px;
  left: 4px;
  .Toastify__toast {
    height: 30px;
    display: flex;
    min-height: unset;
    border-radius: 4px;
    border: 2px solid grey;
  }
  .Toastify__toast-body {
    margin: unset;
    font-size: 10px;
  }
  }
`;

const StyledKeyboardListener = styled.input`
  height: 0px;
  width: 0px;
  opacity: 0;
`;

const GameMapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledGameMap = styled.div<{ offsetX: number; offsetY: number }>`
  position: relative;
  height: 640px;
  width: 640px;
  margin-top: ${({ offsetY }) => `-${offsetY}px`};
  margin-left: ${({ offsetX }) => `-${offsetX}px`};
  border-radius: 6px;

  img {
    vertical-align: top;
  }
`;

const Camera = styled.div`
  margin-left: 170px;
  height: 320px;
  width: 320px;
  overflow: hidden;
  transform: scale(1.5);
  border: grey 1px solid;
`;

export default GameMap;
