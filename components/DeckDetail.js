import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { gray, fafafa, black, purple, white, red } from '../utils/colors'
import { deleteDeck, getDeck } from '../utils/api'
import { handleGetDecks } from '../actions/decks'

class DeckDetail extends Component {
  state = {
	deckDeleted: false,
  }
  handleDeleteDeckClick = () => {
    const { dispatch, deck } = this.props
	if (deck === null) {
      return
    }
    deleteDeck(deck.title)
	dispatch(handleGetDecks())
	this.setState(() => ({
      deckDeleted: true,
    }))
  }
  
  render() {
    const { deckDeleted } = this.state
    const { navigation, deck} = this.props
	console.log(deckDeleted)
	if (deckDeleted === true) {
      navigation.navigate("Home")
    }

    return (
      <View style={styles.container, styles.row, styles.center}>
        <View style={styles.center}>
		  {deck !== null && (<Text style={styles.deckTitle}>{deck.title}</Text>)}
		  {deck !== null && (<Text style={styles.deckCardCountText}>{`${deck.questions.length} card(s)`}</Text>)}
        </View>
		<View style={styles.row, styles.center}>
		  <View style={styles.center, styles.cardActionBtn}>
			<TouchableOpacity
			  style={Platform.OS === 'ios' ? styles.iosAddCardBtn : styles.AndroidAddCardBtn}
			  onPress={() => navigation.navigate("Home")}>
				<Text style={styles.addCardBtnText}>Add Card</Text>
			</TouchableOpacity>
		  </View>
		  <View style={styles.center, styles.cardActionBtn}>
			<TouchableOpacity
			  style={Platform.OS === 'ios' ? styles.iosStartQuizBtn : styles.AndroidStartQuizBtn}
			  onPress={() => navigation.navigate("Home")}>
				<Text style={styles.startQuizBtnText}>Start Quiz</Text>
			</TouchableOpacity>
          </View>
		  <View style={styles.center, styles.cardActionBtn}>
			<TouchableOpacity
			  style={Platform.OS === 'ios' ? styles.iosDeleteDeckBtn : styles.AndroidDeleteDeckBtn}
			  onPress={this.handleDeleteDeckClick}>
				<Text style={styles.deleteDeckBtnText}>Delete Deck</Text>
			</TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  deckTitle: {
    color: black,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deckCardCountText: {
    textAlign: 'center',
  },
  cardActionBtn: {
	height:70,
  },
  iosAddCardBtn: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidAddCardBtn: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 45,
    paddingRight: 45,
    height: 45,
    borderRadius: 2,
	borderWidth: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosStartQuizBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
	marginBottom: 15,
  },
  AndroidStartQuizBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 45,
    paddingRight: 45,
    height: 45,
    borderRadius: 2,
	borderWidth: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosDeleteDeckBtn: {
    backgroundColor: fafafa,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
	marginBottom: 15,
  },
  AndroidDeleteDeckBtn: {
    backgroundColor: fafafa,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
	marginBottom: 15,
  },
  addCardBtnText: {
    color: gray,
    textAlign: 'center',
  },
  startQuizBtnText: {
    color: white,
    textAlign: 'center',
  },
  deleteDeckBtnText: {
    color: red,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

function mapStateToProps (state, { navigation, entryId }) {
  const { decks } = state.decks
  let deckItems = {}
  if (Object.keys(decks).length > 0) Object.keys(decks).forEach(key => {
	Object.keys(decks[key]).forEach(key2 => {
	  deckItems[key2] = decks[key][key2]
	})
  })
  
  return {
	deck: deckItems !== null && typeof deckItems[entryId] !== 'undefined' ? deckItems[entryId] : null,
	navigation
  }
}

export default connect(
  mapStateToProps,
)(DeckDetail)