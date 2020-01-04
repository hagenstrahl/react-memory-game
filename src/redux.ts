import { createStore } from "redux";
import { shuffle } from "./helper";

// card actions
export const CARD_CLICKED: string = "CARD_CLICKED";

export const clickCard = (id: number) => {
  return {
    type: CARD_CLICKED,
    cardID: id
  };
};

// card set
const cardSet: string[] = [
  "cat",
  "cat",
  "dog",
  "dog",
  "mouse",
  "mouse",
  "squirrel",
  "squirrel",
  "snake",
  "snake"
];

// state
interface State {
  cards: string[];
  currentCard: number[];
}

const initialState: State = {
  cards: shuffle(cardSet),
  currentCard: []
};

// reducer
export function cardReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case CARD_CLICKED:
      console.log("yeah");
      const newState: State = { ...state };
      if (state.currentCard.length === 0) {
        newState.currentCard.push(action.cardID);
      }
      return newState;
  }
  return state;
}

export const store = createStore(cardReducer);
