import React from "react";
import "./App.css";
import { State } from "../game/gameReducer";
import { connect } from "react-redux";
import Board from "./Board";

interface AppProps {
  isWon: boolean;
}

const App = ({ isWon }: AppProps) => (
  <div className="App">
    <h1>Memory Game</h1>
    <Board />
    <p>{isWon ? "You are a winner" : ""}</p>
  </div>
);

const mapStateToPropsForApp = (state: State): AppProps => ({
  isWon: state.isWon
});

export default connect(mapStateToPropsForApp)(App);
