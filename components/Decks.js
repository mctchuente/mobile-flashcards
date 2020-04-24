import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fafafa, white } from '../utils/colors'
import { AppLoading } from 'expo'
import { handleGetDecks } from '../actions/decks'
import Deck from './Deck'

class Decks extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    const { dispatch, handleInitialData } = this.props
	handleInitialData()
	this.setState({ready: true})
  }
  render() {
    const { decks, navigation } = this.props
    const { ready } = this.state
	
    if (ready === false) {
      return <AppLoading />
    }
	
	let deckItems = {}
    if (Object.keys(decks).length > 0) Object.keys(decks['decks']).forEach(key => {
	  Object.keys(decks['decks'][key]).forEach(key2 => {
		deckItems[key2] = decks['decks'][key][key2]
	  })
	})
	const deckList = deckItems !== null && Object.keys(deckItems).map((id, index) => (
		  <Deck key={id} deck={deckItems[id]} navigation={navigation} />
		))
	return (
      <View style={styles.container}>
		{deckList}
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
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


function mapStateToProps ({decks}) {//state
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleInitialData: () => dispatch(handleGetDecks())
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(Decks)