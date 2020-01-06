import * as gameService from "./gameService";

export const OPEN_CARD: string = "OPEN_CARD";
export const CLOSE_CARDS: string = "CLOSE_CARDS";
export const MATCH_CARDS: string = "MATCH_CARDS";
export const WIN_GAME: string = "WIN_GAME";

const openCard = (id: number) => ({
    type: OPEN_CARD,
    id
  })

const closeCards = () => ({
    type: CLOSE_CARDS
  })

const matchCards = () => ({
    type: MATCH_CARDS
  })

const winGame = () => ({
    type: WIN_GAME
  })

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