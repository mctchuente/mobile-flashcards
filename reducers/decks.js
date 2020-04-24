import { RECEIVE_DECKS, SINGLE_DECK, ADD_DECK_TITLE, ADD_CARD_TO_DECK } from '../actions/decks'

export default function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case SINGLE_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_DECK_TITLE :
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: (state[action.title].questions.indexOf(action.card) > -1)
			  ? state[action.title].questions
			  : state[action.title].questions.concat([action.card])
        }
      }
    default :
      return state
  }
}