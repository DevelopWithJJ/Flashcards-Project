import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function Card({ card, cards, deck, setDeck }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const deleteHandler = () => {
    deleteCard(card.id)
      .then(() => {
        setDeck({
          ...deck,
          cards: cards.filter((currentCard) => currentCard.id !== card.id),
        });
      })
      .then(history.push(`/decks/${deck.id}`))
      .catch((error) => console.log(error));
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <p className="card-text">{card.front}</p>
              </div>
              <div className="col-6">
                <p className="card-text">{card.back}</p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 text-right">
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-secondary mr-2"
                >
                  <span className="oi oi-pencil mr-1"></span>Edit
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this card? \n\nYou will not be able to recover it."
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
