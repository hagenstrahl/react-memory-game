import React from "react";
import "./App.css";
import { clickCard } from "./redux";
import { connect } from "react-redux";

interface CardProps {
  value: string;
  index: number;
}

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className="Card">
        <div className="card hide" onClick={() => this.props.clickCard(this.props.index)}>
          {this.props.value}
        </div>
      </div>
    );
  }
}

const mapStateForCard = (store: any) : CardProps => {
  return {
    clickCard: 
  };
};

connect(mapStateForCard, { clickCard })(Card);

class Board extends React.Component {
  render() {
    return (
      <div className="Board">
        {this.props.cards.map((value: string, index: number) => {
          return <Card value={value} index={index} clickCard={null} />;
        })}
      </div>
    );
  }
}

const mapStateToPropsBoard = (store: any) => {
  return {
    cards: store.state.cards
  };
};

connect(mapStateToPropsBoard)(Board);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Memory Game</h1>
        <Board />
      </div>
    );
  }
}

export default App;
