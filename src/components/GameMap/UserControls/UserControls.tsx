import styled from "styled-components";
import { usePlayerStore } from "../../../zustand/playerStore";

const UserControls = () => {
  const { player } = usePlayerStore();

  const getExpValue = () => {
    return ((player.exp * 100) / player.maxExp).toFixed(2);
  };
  return (
    <UserControlsContainer>
      <DivWrapper>
        <Label>Name:</Label> {player.name}
      </DivWrapper>
      <DivWrapper>
        <Label>Level:</Label> {player.level}
      </DivWrapper>
      <DivWrapper>
        <Label>Exp:</Label>
        <ValueBarContainer>
          <ValueBar color="royalblue" />
          <ValueBarValue>{getExpValue()}%</ValueBarValue>
        </ValueBarContainer>
      </DivWrapper>
      <DivWrapper>
        <Label>Health:</Label>
        <ValueBarContainer>
          <ValueBar color="firebrick" />
          <ValueBarValue>
            {player.health} / {player.maxHealth}
          </ValueBarValue>
        </ValueBarContainer>
      </DivWrapper>

      <DivWrapper>
        <Label>Energy:</Label>
        <ValueBarContainer>
          <ValueBar color="forestgreen" />
          <ValueBarValue>
            {player.energy} / {player.maxEnergy}
          </ValueBarValue>
        </ValueBarContainer>
      </DivWrapper>
      <Divider />
    </UserControlsContainer>
  );
};

const UserControlsContainer = styled.div`
  height: 456px;
  width: 176px;
  margin-left: 85px;
  background: black;
  border: grey 1px solid;
  color: white;
  padding: 12px;
  font-size: 12px;
`;

const DivWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const Label = styled.span`
  width: 55px;
  display: inline-block;
  font-size: 14px;
`;

const ValueBarContainer = styled.div`
  position: relative;
  display: flex;
  height: 17px;
  width: 120px;
  border-radius: 30px;
  border: 1px solid white;
`;

const ValueBar = styled.div<{ color: string }>`
  display: flex;
  height: 17px;
  width: 60px;
  border-radius: 30px;
  background: ${({ color }) => `${color}`};
`;

const ValueBarValue = styled.div`
  position: absolute;
  width: 80px;
  text-align: center;
  left: 20px;
`;

const Divider = styled.div`
  border: 1px solid grey;
  margin-top: 12px;
`;
export default UserControls;
