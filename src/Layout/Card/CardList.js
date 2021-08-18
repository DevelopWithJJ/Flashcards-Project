import React from "react";
import Card from "./Card";

function CardList({ cards, deck, setDeck }) {
  const cardList = cards.map((card, index) => (
    <Card key={index} card={card} deck={deck} setDeck={setDeck} cards={cards} />
  ));
  return <div>{cardList}</div>;
}

export default CardList;
