import styled from "styled-components";
import { useOverworldStore } from "../../../zustand/OverworldStore";

const GameMapText = () => {
  const { eventText } = useOverworldStore();

  if (!eventText) return null;

  return <GameMapTextContainer>{eventText}</GameMapTextContainer>;
};

const GameMapTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 16px;
  background: #86693c;
  border: 2px solid black;
  width: 284px;
  height: 40px;
  font-size: 10px;
  display: flex;
  align-items: center;
`;

export default GameMapText;
