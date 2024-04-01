import styled from "styled-components";
import { Npc } from "../../types/Entities/types";
import useNpcMovement from "./useNpcMovement";

type NpcProps = {
  npc: Npc;
};

const NpcComponent = ({ npc }: NpcProps) => {
  useNpcMovement({ npc });
  const offsetx = npc.positionX * 16;
  const offsety = npc.positionY * 16;

  return (
    <StyledNpc offsetx={offsetx} offsety={offsety}>
      {npc.currentSprite}
    </StyledNpc>
  );
};

const StyledNpc = styled.div<{ offsetx: number; offsety: number }>`
  position: absolute;
  height: 16px;
  width: 16px;
  color: black;
  top: ${({ offsety }) => `${offsety}px`};
  left: ${({ offsetx }) => `calc(3px + ${offsetx}px)`};
`;

export default NpcComponent;
