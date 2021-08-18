import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Common/Header";
import NotFound from "./Common/NotFound";
import CreateDeck from "./Deck/CreateDeck";
import DeckList from "./Deck/DeckList";
import Deck from "./Deck/Deck";
import Study from "./Study";
import { listDecks } from "../utils/api";

function Layout() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDecks() {
      try {
        const decks = await listDecks(abortController.signal);
        setDecks(decks);
      } catch (err) {
        console.log(err);
      }
    }
    getDecks();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.push("/decks/new")}
            >
              <span className="oi oi-plus"></span> Create Deck
            </button>
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck decks={decks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/:deckId">
            <Deck decks={decks} setDecks={setDecks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
