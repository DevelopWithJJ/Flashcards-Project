import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({ submit, cancel, card, setCard }) {
  const history = useHistory();

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        submit.action();
      }}
    >
      <div className="form-group">
        <label htmlFor="name">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          type="text"
          placeholder="Front side of card"
          rows="2"
          value={card.front}
          onChange={(event) => setCard({ ...card, front: event.target.value })}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="description">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          placeholder="Back side of card"
          rows="2"
          value={card.back}
          onChange={(event) => setCard({ ...card, back: event.target.value })}
          required
        ></textarea>
      </div>
      <br />
      <button
        onClick={() => history.push(cancel.url)}
        type="button"
        className="btn btn-secondary mr-2"
      >
        {cancel.name}
      </button>
      <button type="submit" className="btn btn-primary mr-2">
        {submit.name}
      </button>
    </form>
  );
}

export default CardForm;
