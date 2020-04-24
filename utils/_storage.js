import { AsyncStorage } from 'react-native'

export const PROJECT_STORAGE_KEY = 'MobileEmpty:storage'

let decks = {
  React: {
	title: 'React',
	questions: [
	  {
		question: 'What is React?',
		answer: 'A library for managing user interfaces'
	  },
	  {
		question: 'Where do you make Ajax requests in React?',
		answer: 'The componentDidMount lifecycle event'
	  }
	]
  },
  JavaScript: {
	title: 'JavaScript',
	questions: [
	  {
		question: 'What is a closure?',
		answer: 'The combination of a function and the lexical environment within which that function was declared.'
	  }
	]
  }
}

function setDummyData () {
  AsyncStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

export function _getDecks () {
  return AsyncStorage.getItem(PROJECT_STORAGE_KEY)
    .then((results) => {
      if (results !== null) decks = JSON.parse(results)
      return results === null
		? setDummyData()
		: decks
    })
}

export function _getDeck (key) {
  return AsyncStorage.getItem(PROJECT_STORAGE_KEY)
    .then((results) => {
      if (results === null) return null
	  decks = JSON.parse(results)
      return decks[key]
    })
}

export function _saveDeckTitle (key) {
  const deck = {
    title: key,
    questions: [],
  }
  decks = {
	...decks,
	[key]: deck
  }
  AsyncStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(decks))
  return _getDeck (key)
}

function _getCardInDeck (key, card) {
  return AsyncStorage.getItem(PROJECT_STORAGE_KEY)
    .then((results) => {
      if (results === null) return null
	  decks = JSON.parse(results)
	  let i = -1
	  const questions = decks[key].questions
	  Object.keys(questions).forEach(key => {
	    if ((questions[key].question === card.question) && (questions[key].answer === card.answer)) i = key
      })
	  if (i > -1) return decks[key].questions[i]
      return null
    })
}

export function _addCardToDeck (key, card) {
  decks = {
	...decks,
	[key]: {
	  ...decks[key],
	  questions: decks[key].questions.concat(card)
	}
  }
  AsyncStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(decks))
  return _getCardInDeck(key, card)
}

export function _deleteDeck (key) {
  if (decks === null) return null
  decks[key] = undefined
  delete decks[key]
  AsyncStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(decks))
  return decks
}