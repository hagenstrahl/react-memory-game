import React from "react";
import "./Board.css";
import { State } from "../game/gameReducer";
import { connect } from "react-redux";
import Card from "./Card"

interface BoardProps {
  cards: {value: string, state: string}[];
}

const Board = ({ cards }: BoardProps) => (
  <div className="Board">
    {cards.map(({value, state}, index: number) => {
      return (
        <Card
          key={index}
          value={value}
          state={state}
          index={index}
        />
      );
    })}
  </div>
);

const mapStateToPropsBoard = (state: State): BoardProps => ({
  cards: state.cards
});

export default connect(mapStateToPropsBoard)(Board);