import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function DeckListItem({ deck, decks, setDecks }) {
  const deleteHandler = () => {
    deleteDeck(deck.id)
      .then(() => {
        setDecks(decks.filter((currentDeck) => currentDeck.id !== deck.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card my-4">
      <div className="card-body">
        <h5 className="card-title">
          <small className="text-muted float-right">{`${
            deck.cards ? deck.cards.length : 0
          } cards`}</small>
          {deck.name}
        </h5>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
          <span className="oi oi-eye mr-1"></span>View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
          <span className="oi oi-book mr-1"></span>Study
        </Link>
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-info mr-2">
          <span className="oi oi-list mr-1"></span>Edit
        </Link>
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Delete this deck? \n\nYou will not be able to recover it."
              )
            ) {
              deleteHandler();
            }
          }}
          className="btn btn-danger text-center float-right"
        >
          <span className="oi oi-trash"></span>
        </button>
      </div>
    </div>
  );
}

export default DeckListItem;
