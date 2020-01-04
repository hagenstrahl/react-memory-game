import React from "react";
import "./App.css";

const Card: React.FC<{value: string}> = props => {
  return (
    <div className="Card">
      <div className="test">{props.value}</div>
    </div>
  );
};

const Board: React.FC = () => {
  return (
    <div className="Board">
      {/* {elements.map((element, index) => {
        return <Card value={element} />;
      })} */}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Board />
    </div>
  );
};

export default App;
