import { getDecks, getDeck, saveDeckTitle, addCardToDeck, deleteDeck } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SINGLE_DECK = 'SINGLE_DECK'
export const ADD_DECK_TITLE = 'ADD_DECK_TITLE'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function handleGetDecks () {
  return (dispatch) => {
    return getDecks()
      .then((results) => {
        dispatch(receiveDecks(results))
      })
  }
}

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function handleGetDeck (id) {
  return (dispatch) => {
    return getDeck(id)
      .then((result) => {
        dispatch(singleDeck(result))
      })
  }
}

export function singleDeck (deck) {
  return {
    type: SINGLE_DECK,
    deck,
  }
}

export function handleSaveDeckTitle (title) {
  return (dispatch) => {
    return saveDeckTitle(title)
      .then((result) => {
        dispatch(addDeckTitle(result))
      })
  }
}

export function addDeckTitle (deck) {
  return {
    type: ADD_DECK_TITLE,
    deck,
  }
}

export function handleAddCardToDeck (title, card) {
  return (dispatch) => {
    return addCardToDeck(title, card)
      .then(() => {
        dispatch(addingCardToDeck(title, card))
      })
  }
}

export function addingCardToDeck (title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card,
  }
}

export function handleDeleteDeck (id) {
  return (dispatch) => {
    return deleteDeck(id)
  }
}