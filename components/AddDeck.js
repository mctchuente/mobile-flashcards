import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
//import TextButton from './TextButton'
//import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { handleSaveDeckTitle, handleGetDecks } from '../actions/decks'
import { fafafa, gray, black, purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
	deckTitle: '',
	nextScreenTitle: '',
	changeScreen: false,
  }
  handleDeckTitleChange = (e) => {
    this.setState({
	  deckTitle: e.target.value
    })
	this.setState({
	  nextScreenTitle: e.target.value
    })
  }
  handleSubmitQuestion = (e) => {
    e.preventDefault()
	
	if (this.state.deckTitle === '') {
      return
    }
	
    const { dispatch } = this.props
	const { deckTitle } = this.state

    dispatch(handleSaveDeckTitle(deckTitle))
    dispatch(handleGetDecks())
	
	this.setState(() => ({
      deckTitle: '',
      changeScreen: true,
    }))
  }
  
  render() {
    const { deckTitle, changeScreen, nextScreenTitle } = this.state
    const { navigation } = this.props
	
	if (changeScreen === true) {
      //navigation.dispatch(NavigationActions.back({key: 'Home'}))
	  //navigation.navigate('DeckDetail', { returnToRoute: navigation.state });
	  navigation.navigate('DeckDetail', {entryId: this.state.nextScreenTitle})
    }
	
	return (
      <View style={styles.container}>
        <Text style={styles.newDeckLabel}>What is the title of your new deck?</Text>
		<View style={styles.row, styles.center}>
          <TextInput 
		    placeholder="Deck Title" 
			style={Platform.OS === 'ios' ? styles.iosInputStyle : styles.AndroidInputStyle} 
			onChange={this.handleDeckTitleChange} 
			value={deckTitle}
		  />
        </View>
		<View style={styles.row, styles.center}>
          <SubmitBtn onPress={this.handleSubmitQuestion} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: fafafa
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  newDeckLabel: {
    color: black,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iosInputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 7,
	backgroundColor: white,
  },
  AndroidInputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 2,
	backgroundColor: white,
	borderWidth: 1,
	borderColor: gray,
  },
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
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

function mapStateToProps (state, { navigation }) {
  const decks = state.decks
  return {
	decks,
	navigation
  }
}

export default connect(
  mapStateToProps
)(AddDeck)