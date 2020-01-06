import React from "react";
import "./Card.css";
import { clickCard } from "../game/gameActions";
import { connect } from "react-redux";

interface CardProps {
  value: string;
  state: string;
  index: number;
  clickCard: (id: number) => any;
}

const Card = ({ value, state, index, clickCard }: CardProps) => (
  <div className={"Card " + state} onClick={() => clickCard(index)}>
    <i className={"fas fa-" + value}></i>
  </div>
);

export default connect(null, { clickCard })(Card);
