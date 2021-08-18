import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardForm from "./CardForm";
import { createCard } from "../../utils/api";

function AddCard({ deck }) {
  const [newCard, setNewCard] = useState({ front: "", back: "" });
  const submitHandler = () => {
    createCard(deck.id, newCard)
      .then((response) => deck.cards.push(response))
      .then(() => setNewCard({ front: "", back: "" }));
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
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <CardForm
        deck={deck}
        card={newCard}
        setCard={setNewCard}
        cancel={{ name: "Done", url: `/decks/${deck.id}` }}
        submit={{ name: "Save", action: submitHandler }}
      />
    </>
  );
}

export default AddCard;
