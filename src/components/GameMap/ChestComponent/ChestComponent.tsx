import styled from "styled-components";
import { TreasureChest } from "../../../types/Entities/types";

type ChestProps = {
  chest: TreasureChest;
};

const ChestComponent = ({ chest }: ChestProps) => {
  const offsetx = chest.positionX * 16;
  const offsety = chest.positionY * 16;

  return (
    <StyledChest offsetx={offsetx} offsety={offsety}>
      <img src={chest.isOpen ? chest.openSprite : chest.sprite} />
    </StyledChest>
  );
};

const StyledChest = styled.div<{ offsetx: number; offsety: number }>`
  position: absolute;
  height: 16px;
  width: 16px;
  color: black;
  top: ${({ offsety }) => `${offsety}px`};
  left: ${({ offsetx }) => `calc(3px + ${offsetx}px)`};

  img {
    height: 13px;
    width: 13px;
  }
`;

export default ChestComponent;
