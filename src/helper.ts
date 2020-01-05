// card actions
export const OPEN_CARD: string = "OPEN_CARD";

// card states
export const CARD_OPEN = "open";
export const CARD_CLOSED = "closed";
export const CARD_MATCHED = "matched";

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

export interface Card {
  value: string;
  state: string;
}

export const prepareCardSet = (): Card[] => {
  let currentIndex: number = cardSet.length,
    temporaryValue: string,
    randomIndex: number,
    newArray: string[] = [...cardSet];

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray.map((value, index) => {
    return {
      value: value,
      state: CARD_CLOSED
    } as Card;
  });
};

const countCardsWithState = (cards: Card[], state: string): number => {
  let counter = 0;
  for (const card of cards) {
    if (card.state === state) {
      counter++;
    }
  }
  return counter;
};

export const countOpenedCards = (cards: Card[]): number => {
  return countCardsWithState(cards, CARD_OPEN);
};

export const countMatchedCards = (cards: Card[]): number => {
  return countCardsWithState(cards, CARD_MATCHED);
};

export const openCard = (cards: Card[], id: number): Card[] => {
  let newCards: Card[] = [...cards];
  newCards[id].state = CARD_OPEN;
  return newCards;
};

export const matchCards = (cards: Card[]): Card[] => {
  let newCards: Card[] = [...cards];
  let firstCard: number = -1;
  for (const card of newCards) {
    if (card.state === CARD_OPEN) {
      if (firstCard === -1) {
        firstCard = newCards.indexOf(card);
      } else if (newCards[firstCard].value === card.value) {
        newCards[firstCard].state = CARD_MATCHED;
        card.state = CARD_MATCHED;
      }
    }
  }

  return newCards;
};

export const closeOpenedCars = (cards: Card[]): Card[] => {
  let newCards = [...cards];

  for (const card of newCards) {
    if (card.state === CARD_OPEN) {
      card.state = CARD_CLOSED;
    }
  }

  return newCards;
};
