import React from "react";
import "./App.css";
import { clickCard, State } from "./redux";
import { connect } from "react-redux";
import { Card } from "./helper";

interface CardProps {
  value: string;
  state: string;
  index: number;
  clickCard: (id: number) => any;
}

const CardComponent = (props: CardProps) => {
  return (
    <div className="Card">
      <div className={props.state} onClick={() => props.clickCard(props.index)}>
        {props.value}
      </div>
    </div>
  );
};

const CardContainer = connect(null, { clickCard })(CardComponent);

interface BoardProps {
  cards: Card[];
}

const Board = (props: BoardProps) => {
  return (
    <div className="Board">
      {props.cards.map((card: Card, index: number) => {
        return (
          <CardContainer
            key={index}
            value={card.value}
            state={card.state}
            index={index}
          />
        );
      })}
    </div>
  );
};

const mapStateToPropsBoard = (state: State): BoardProps => {
  return {
    cards: state.cards
  };
};

const BoardContainer = connect(mapStateToPropsBoard)(Board);

interface AppProps {
  isWon: boolean;
}

const App = (props: AppProps) => {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <BoardContainer />
      <p>{props.isWon ? "You are a winner" : ""}</p>
    </div>
  );
};

const mapStateToPropsForApp = (state: State): AppProps => {
  return {
    isWon: state.isWon
  };
};

const AppContainer = connect(mapStateToPropsForApp)(App);

export default AppContainer;
