import { _getDecks, _getDeck, _saveDeckTitle, _deleteDeck, _addCardToDeck } from './_storage'

export function getDecks () {
  return Promise.all([
    _getDecks(),
  ]).then((decks) => ({
    decks,
  }))
}

export function getDeck (id) {
  return _getDeck(id)
}

export function saveDeckTitle (title) {
  return _saveDeckTitle(title)
}


export function deleteDeck (id) {
  return _deleteDeck(id)
}

export function addCardToDeck (title, card) {
  return _addCardToDeck(title, card)
}