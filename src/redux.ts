import { createStore } from "redux";
import {
  prepareCardSet,
  Card,
  OPEN_CARD,
  countOpenedCards,
  countMatchedCards,
  openCard,
  matchCards,
  closeOpenedCars
} from "./helper";

export const clickCard = (id: number) => {
  return {
    type: OPEN_CARD,
    cardID: id
  };
};

// state
export interface State {
  cards: Card[];
  isWon: boolean;
}

const initialState: State = {
  cards: prepareCardSet(),
  isWon: false
};

// reducer
export function cardReducer(state: State = initialState, action: any) {
  switch (action.type) {
    case OPEN_CARD:
      const newState: State = { ...state };
      let countOpenCards: number = countOpenedCards(newState.cards);

      // check for opened and not matched cards
      if (countOpenCards === 2) {
        newState.cards = closeOpenedCars(newState.cards);
        countOpenCards = 0;
      }

      // open new card
      newState.cards = openCard(newState.cards, action.cardID);
      countOpenCards++;
      if (countOpenCards === 2) {
        newState.cards = matchCards(newState.cards);
      }

      // check for game won
      if (countMatchedCards(newState.cards) === newState.cards.length) {
        newState.isWon = true;
      }

      return newState;
  }
  return state;
}

export const store = createStore(cardReducer);
