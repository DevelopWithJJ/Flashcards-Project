import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard } from "../../utils/api";
import { updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard({ deck }) {
  const history = useHistory();
  const cardId = useParams().cardId;
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    const abortController = new AbortController();
    async function getCard() {
      try {
        const currentCard = await readCard(cardId, abortController.signal);
        setCard(currentCard);
      } catch (err) {
        console.log(err);
      }
    }
    getCard();

    return () => {
      abortController.abort();
    };
  }, [cardId]);

  const editHandler = () => {
    updateCard(card)
      .then((response) => {
        card.front = response.front;
        card.back = response.back;
        const targetCard = deck.cards.find((card) => card.id === cardId);
        targetCard.front = card.front;
        targetCard.back = card.back;
      })
      .then(history.push(`/decks/${deck.id}`))
      .catch(console.log);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home"></span>Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>
              <span className="oi"></span>
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <CardForm
        deck={deck}
        card={card}
        setCard={setCard}
        submit={{ name: "Submit", action: editHandler }}
        cancel={{ name: "Cancel", url: `/decks/${deck.id}` }}
      />
    </>
  );
}

export default EditCard;
