import { createStore, applyMiddleware } from "redux";
import * as gameService from "./gameService";
import thunk from "redux-thunk";

// card actions
const OPEN_CARD: string = "OPEN_CARD";
const CLOSE_CARDS: string = "CLOSE_CARDS";
const MATCH_CARDS: string = "MATCH_CARDS";
const WIN_GAME: string = "WIN_GAME";

const openCard = (id: number) => {
  return {
    type: OPEN_CARD,
    cardID: id
  };
};

const closeCards = () => {
  return {
    type: CLOSE_CARDS
  };
};

const matchCards = () => {
  return {
    type: MATCH_CARDS
  };
};

const winGame = () => {
  return {
    type: WIN_GAME
  };
};

export const clickCard = (id: number) => {
  return (dispatch: any, getState: any) => {
    const cardId = id;

    const { cards } = getState();
    if (gameService.countOpenedCards(cards) === 2) {
      dispatch(closeCards());
    }

    dispatch(openCard(cardId));

    if (gameService.countOpenedCards(cards) === 2) {
      dispatch(matchCards());
    }

    if (gameService.countMatchedCards(cards) === cards.length) {
      dispatch(winGame());
    }
  };
};

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
      newState.cards = gameService.openCard(newState.cards, action.cardID);
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
