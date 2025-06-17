import React from "react";
import { HistoryDatesSection } from "./components/HistoryDatesSection";
import { HISTORY_SECTIONS } from "./mockData";
import { Wrapper } from "./components/Wrapper";

const App: React.FC = () => {
  return (
    <Wrapper>
      <HistoryDatesSection sections={HISTORY_SECTIONS} />
    </Wrapper>
  );
};

export default App;
