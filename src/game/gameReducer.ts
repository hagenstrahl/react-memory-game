import { createStore, applyMiddleware } from "redux";
import * as gameService from "./gameService";
import thunk from "redux-thunk";
import { OPEN_CARD, CLOSE_CARDS, MATCH_CARDS, WIN_GAME } from "./gameActions";



// state
export interface State {
  cards: gameService.Card[];
  isWon: boolean;
}

const initialState: State = {
  cards: gameService.prepareCardSet(),
  isWon: false
};

// reducer
export function cardReducer(state: State = initialState, action: any) {
  const newState: State = { ...state };

  switch (action.type) {
    case OPEN_CARD:
      newState.cards = gameService.openCard(newState.cards, action.id);
      return newState;
    case CLOSE_CARDS:
      newState.cards = gameService.closeOpenedCars(newState.cards);
      return newState;
    case MATCH_CARDS:
      newState.cards = gameService.matchCards(newState.cards);
      return newState;
    case WIN_GAME:
      newState.isWon = true;
      return newState;
  }
  return state;
}

export const store = createStore(cardReducer, applyMiddleware(thunk));