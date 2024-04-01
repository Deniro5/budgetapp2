import { Route, Routes } from "react-router";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { COLORS, SPACING } from "../Theme";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

function MainLayout() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <AppContainer>
      <Sidebar isExpanded={isExpanded} toggleExpanded={toggleExpanded} />

      <ContentContainer isExpanded={isExpanded}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<p> transactions </p>} />
          <Route path="/reports" element={<p> reports </p>} />
          <Route path="/savings" element={<p> savings </p>} />
          <Route path="/debts" element={<p> debts </p>} />
          <Route path="/settings" element={<p> settings </p>} />
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div<{ isExpanded: boolean }>`
  flex: 1;
  padding: ${SPACING.spacing6x};
  width: ${({ isExpanded }) =>
    isExpanded ? "calc(100vw - 232px)" : "calc(100vw - 88px)"};
  height: calc(100vh - 48px);
`;

export default MainLayout;
