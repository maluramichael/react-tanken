'use strict';

var React = require('react-native');

var {AppRegistry, StyleSheet, Text, TextInput, TouchableHighlight, View} = React;

var {TabBarIOS} = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

let Application = React.createClass({
	getInitialState: function () {
		return {
			selectedTab: 'refill'
		};
	},

	_renderRefill() {
		return (
			<View style={[
                styles.tabContent, {
                    backgroundColor: 'cornflowerblue'
                }
            ]}>
				<Text>Kilometerstand</Text>
				<TextInput style={styles.textInput} onChangeText={(text) => this.setState({text})}
						   value={this.state.current}/>
				<Text>Preis pro Liter</Text>
				<TextInput style={styles.textInput} onChangeText={(text) => this.setState({text})}
						   value={this.state.price}/>
				<Text>Liter getankt</Text>
				<TextInput style={styles.textInput} onChangeText={(text) => this.setState({text})}
						   value={this.state.liter}/>
				<TouchableHighlight><Text>Speichern</Text></TouchableHighlight>
			</View>
		)
	},
	_renderContent: function (color:string, pageText:string, num:number) {
		return (
			<View style={[
                styles.tabContent, {
                    backgroundColor: color
                }
            ]}>
				<Text style={styles.tabText}>{pageText}</Text>
				<Text style={styles.tabText}>{num}
					re-renders of the
					{pageText}</Text>
			</View>
		)
	},

	render: function () {
		return (
			<TabBarIOS tintColor="white" barTintColor="darkslateblue">
				<TabBarItemIOS name="Tanken" iconName={'ion|ios-paper-outline'} title="Tanken" systemIcon="history" selected={this.state.selectedTab === 'refill'}
								onPress={() => {
                    this.setState({
                        selectedTab: 'refill'
                    });
                }}>
					{this._renderRefill()}
				</TabBarItemIOS>
			</TabBarIOS>
		);
	}
});

var reacttanken = new Application()

var styles = StyleSheet.create({
	tabContent: {
		flex: 1,
		padding: 10,
		paddingTop: 30
	},
	tabText: {
		color: 'white',
		margin: 50
	},
	button: {},
	textInput: {
		height: 30,
		borderColor: '#333',
		borderWidth: 1,
		backgroundColor: '#fff',
		marginTop: 5,
		marginBottom: 20,
		paddingLeft: 4,
		paddingRight: 4
	}
});

AppRegistry.registerComponent('reacttanken', () => Application);
