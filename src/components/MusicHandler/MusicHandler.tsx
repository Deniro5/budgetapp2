import React from "react";
import { useMapStore } from "../../zustand/GameMapStore";
import styled from "styled-components";

const MusicHandler = () => {
  const { song } = useMapStore();

  //TODO: move this up one level. It rerenders unnecesscarily with the map
  if (!song) return;

  return (
    <>
      <StyledAudio src={song} controls autoPlay={true} loop={true} />
    </>
  );
};

const StyledAudio = styled.audio`
  display: none;
`;

export default MusicHandler;
