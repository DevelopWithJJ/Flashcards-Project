import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardList from "../Card/CardList";
import EditCard from "../Card/EditCard";
import AddCard from "../Card/AddCard";
import DeckForm from "./DeckForm";
import { deleteDeck } from "../../utils/api";

function Deck({ decks, setDecks }) {
  const [deck, setDeck] = useState({});
  const deckId = useParams().deckId;
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setDeck(deck);
      } catch (err) {
        console.log(err);
      }
    }
    getDeck();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const deleteHandler = () => {
    deleteDeck(deck.id)
      .then(() => {
        setDecks(decks.filter((currentDeck) => currentDeck.id !== deck.id));
      })
      .then(history.push("/"))
      .catch((error) => console.log(error));
  };

  return deck.id ? (
    <>
      <Switch>
        <Route exact path={url}>
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <span className="oi oi-home"></span>Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {deck.name}
                </li>
              </ol>
            </nav>
            <h4 className="mb-3">{deck.name}</h4>
            <p>{deck.description}</p>
            <Link to={`${url}/edit`} className="btn btn-secondary mr-2">
              <span className="oi oi-pencil mr-1"></span>Edit
            </Link>
            <Link to={`${url}/study`} className="btn btn-primary mr-2">
              <span className="oi oi-book mr-1"></span>Study
            </Link>
            <Link to={`${url}/cards/new`} className="btn btn-primary mr-2">
              <span className="oi oi-plus mr-1"></span>Add Cards
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
            <h3 className="mt-4">Cards</h3>
            <CardList cards={deck.cards} deck={deck} setDeck={setDeck} />
          </div>
        </Route>
        <Route path={`${url}/edit`}>
          <DeckForm deck={deck} />
        </Route>
        <Route exact path={`${url}/cards/new`}>
          <AddCard deck={deck} />
        </Route>
        <Route exact path={`${url}/cards/:cardId/edit`}>
          <EditCard deck={deck} />
        </Route>
      </Switch>
    </>
  ) : null;
}

export default Deck;
