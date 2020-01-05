import React from "react";
import "./App.css";
import { clickCard, State } from "./redux";
import { connect } from "react-redux";
import { Card } from "./gameService";

interface CardProps {
  value: string;
  state: string;
  index: number;
  clickCard: (id: number) => any;
}

const CardComponent = ({ value, state, index, clickCard }: CardProps) => (
  <div className="Card">
    <div className={state} onClick={() => clickCard(index)}>
      {value}
    </div>
  </div>
);

const CardContainer = connect(null, { clickCard })(CardComponent);

interface BoardProps {
  cards: Card[];
}

const Board = ({ cards }: BoardProps) => (
  <div className="Board">
    {cards.map((card: Card, index: number) => {
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

const mapStateToPropsBoard = (state: State): BoardProps => ({
  cards: state.cards
});

const BoardContainer = connect(mapStateToPropsBoard)(Board);

interface AppProps {
  isWon: boolean;
}

const App = ({ isWon }: AppProps) => (
  <div className="App">
    <h1>Memory Game</h1>
    <BoardContainer />
    <p>{isWon ? "You are a winner" : ""}</p>
  </div>
);

const mapStateToPropsForApp = (state: State): AppProps => ({
  isWon: state.isWon
});

const AppContainer = connect(mapStateToPropsForApp)(App);

export default AppContainer;
