import styled from "styled-components";
import {
  SpriteDirections,
  SpriteMap,
  SpritePositions,
} from "../types/Entities/types";

type SpriteExtractorProps = {
  spriteSheet: string;
};

const getEmptySpriteMap = () => {
  const emptySpriteMap: SpriteMap = {
    [SpriteDirections.Forward]: [],
    [SpriteDirections.Left]: [],
    [SpriteDirections.Right]: [],
    [SpriteDirections.Back]: [],
  };
  return emptySpriteMap;
};

const SpriteSheetToSpriteMap = ({ spriteSheet }: SpriteExtractorProps) => {
  const spriteMap: SpriteMap = { ...getEmptySpriteMap() };
  const spriteMapKeys = Object.values(SpriteDirections);
  for (let i = 0; i < 16; i++) {
    const row = Math.floor(i / 4);
    const col = i % 4;
    const positionX = col * (16 + 8) + 8;
    const positionY = row * (16 + 8) + 8;
    // Style to clip the specific sprite from the spritesheet

    // Style for the img element to adjust its position within the container
    const imgStyle = {
      left: `-${positionX - 2}px`,
      top: `-${positionY}px`,
    };

    spriteMap[spriteMapKeys[row]].push(
      <Sprite>
        <StyledImage src={spriteSheet} alt="Sprite" style={imgStyle} />
      </Sprite>
    );
  }
  return spriteMap;
};

const Sprite = styled.div`
  position: relative;
  overflow: hidden;
  width: 16px;
  height: 16px;
`;

const StyledImage = styled.img`
  position: absolute;
`;

export default SpriteSheetToSpriteMap;
