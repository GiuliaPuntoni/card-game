import styled from 'styled-components';
import React from 'react';

import Header from './components/Header/Header';
import GameTable from './components/GameTable/GameTable';



function App() {
  return (
    <div className="App">
      <Header></Header>
      <GameTable></GameTable>
    </div>
  );
}

export default App;
