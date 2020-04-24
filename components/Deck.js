import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { fafafa, black, purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import * as WebBrowser from 'expo-web-browser';// to remove

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}
class Deck extends Component {
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }
  render() {
	const { deck, navigation } = this.props
	return (
      <View style={styles.container, styles.row, styles.center}>
        <TouchableOpacity style={{padding: 15}} onPress={() => navigation.navigate("DeckDetail", {entryId: deck.title})}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
		  <Text style={styles.deckCardCountText}>{`${deck.questions.length} card(s)`}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: fafafa
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
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
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

function mapStateToProps (state, {deck}) {
  return {
	deck
  }
}

export default connect(
  mapStateToProps
)(Deck)