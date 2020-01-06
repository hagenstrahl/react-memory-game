// card states
export const CARD_OPEN = "open";
export const CARD_CLOSED = "closed";
export const CARD_MATCHED = "matched";

// card set
const cardSet: string[] = [
  "frog",
  "frog",
  "fish",
  "fish",
  "dog",
  "dog",
  "cat",
  "cat",
  "crow",
  "crow",
  "horse",
  "horse",
  "kiwi-bird",
  "kiwi-bird",
  "spider",
  "spider"
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

const countCardsWithState = (cards: Card[], state: string): number =>
  cards.filter(card => card.state === state).length;

export const countOpenedCards = (cards: Card[]): number =>
  countCardsWithState(cards, CARD_OPEN);

export const countMatchedCards = (cards: Card[]): number =>
  countCardsWithState(cards, CARD_MATCHED);

export const openCard = (cards: Card[], id: number): Card[] => {
  let newCards: Card[] = [...cards];
  newCards[id].state = CARD_OPEN;
  return newCards;
};

export const matchCards = (cards: Card[]): Card[] => {
  const openCards = cards.filter(card => card.state === CARD_OPEN);
  if (
    openCards.filter(card => card.value === openCards[0].value).length ===
    openCards.length
  )
    return cards.map(card => {
      if (card.state === CARD_OPEN) card.state = CARD_MATCHED;
      return card;
    });
  return cards;
};

export const closeOpenedCars = (cards: Card[]): Card[] =>
  cards.map(card => {
    if (card.state === CARD_OPEN) {
      card.state = CARD_CLOSED;
    }
    return card;
  });
