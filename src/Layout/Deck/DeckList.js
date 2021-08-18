import React from "react";
import DeckListItem from "./DeckListItem";

function DeckList({ decks, setDecks }) {
  const deckList = decks.map((deck, index) => (
    <DeckListItem key={index} deck={deck} decks={decks} setDecks={setDecks} />
  ));

  return <div>{deckList}</div>;
}

export default DeckList;
