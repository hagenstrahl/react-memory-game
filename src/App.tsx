import React from "react";
import "./App.css";
import { clickCard } from "./redux";
import { connect } from "react-redux";

interface CardProps {
  value: string;
  index: number;
  clickCard: (id: number) => any;
}

const Card = (props: CardProps) => {
  return (
    <div className="Card">
      <div className="card hide" onClick={() => props.clickCard(props.index)}>
        {props.value}
      </div>
    </div>
  );
};

const mapStateToPropsCard = (store: any) => {
  return {
    //TODO class list
  };
};

const CardContainer = connect(mapStateToPropsCard, { clickCard })(Card);

interface BoardProps {
  cards: string[];
}

const Board = (props: BoardProps) => {
  return (
    <div className="Board">
      {props.cards.map((value: string, index: number) => {
        return <CardContainer value={value} index={index} />;
      })}
    </div>
  );
};

const mapStateToPropsBoard = (state: any): BoardProps => {
  return {
    cards: state.cards
  };
};

const BoardContainer = connect(mapStateToPropsBoard)(Board);

const App = () => {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <BoardContainer />
    </div>
  );
};

export default App;
