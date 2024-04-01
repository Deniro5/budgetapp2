import styled from "styled-components";
import { usePlayerStore } from "../../zustand/playerStore";

const Player = () => {
  const { player } = usePlayerStore();

  const offsetx = player.positionX * 16;
  const offsety = player.positionY * 16;

  return (
    <StyledPlayer offsetx={offsetx} offsety={offsety}>
      {player.currentSprite}
    </StyledPlayer>
  );
};

const StyledPlayer = styled.div<{ offsetx: number; offsety: number }>`
  position: absolute;
  height: 16px;
  width: 16px;
  color: black;
  top: ${({ offsety }) => `${offsety}px`};
  left: ${({ offsetx }) => `calc(3px + ${offsetx}px)`};
`;

export default Player;
