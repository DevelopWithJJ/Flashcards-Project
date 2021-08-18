import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck } from "../../utils/api";

function DeckForm({ deck }) {
  const [deckName, setDeckName] = useState(deck.name);
  const [deckDescription, setDeckDescription] = useState(deck.description);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    updateDeck({ ...deck, name: deckName, description: deckDescription })
      .then((response) => {
        deck.name = response.name;
        deck.description = response.description;
      })
      .then(history.go(0))
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
            Edit
          </li>
        </ol>
      </nav>
      <h1 className="mb-3">Edit Deck</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            placeholder={deck.name}
            value={deckName}
            onChange={(event) => setDeckName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder={deck.description}
            rows="4"
            value={deckDescription}
            onChange={(event) => setDeckDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <br />
        <button
          onClick={() => history.go(-1)}
          type="button"
          className="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <input className="btn btn-primary" type="submit" value="Submit"></input>
      </form>
    </>
  );
}

export default DeckForm;
