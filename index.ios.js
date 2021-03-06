'use strict';

var React = require('react-native');

var {AppRegistry, StyleSheet, Text, TextInput, TouchableHighlight, View, ListView} = React;

var {TabBarIOS} = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

let Application = React.createClass({
	history: [],

	getInitialState: function () {
		return {
			current: '',
			price: '',
			liter: '',
			selectedTab: 'refill',
			dataSource: new ListView.DataSource({rowHasChanged: (a, b)=>a !== b})
		};
	},

	componentDidMount: function(){
		this.history = [{
			liter: 1,
			price: 2,
			current: 3
		}];

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.history)
		})
	},

	_renderRefill() {
		return (
			<View style={[
                styles.tabContent, {
                    backgroundColor: '#042536'
                }
            ]}>
				<Text style={styles.text}>Kilometerstand</Text>
				<TextInput style={styles.textInput} onChangeText={(text) => this.setState({current: text})}
						   value={this.state.current}/>
				<Text style={styles.text}>Preis pro Liter</Text>
				<TextInput style={styles.textInput} onChangeText={(text) => this.setState({price: text})}
						   value={this.state.price}/>
				<Text style={styles.text}>Liter getankt</Text>
				<TextInput style={styles.textInput} onChangeText={(text) => this.setState({liter: text})}
						   value={this.state.liter}/>
				<TouchableHighlight onPress={this._saveRefill}><Text style={styles.button}>Speichern</Text></TouchableHighlight>
			</View>
		)
	},
	_renderHistory() {
		return (
			<View style={[
                styles.tabContent, {
                    backgroundColor: 'lightblue'
                }
            ]}>
				<ListView dataSource={this.state.dataSource}
						  renderRow={(rowData) => <View><Text> Liter {rowData.liter}</Text></View>}>
				</ListView>
			</View>
		)
	},
	_saveRefill(){

		// append current refill state to history
		var currentData = {
			liter: this.state.liter,
			price: this.state.price,
			current: this.state.current
		};

		var id = this.history.length;

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.history)
		});

		// save history in persistent storage
		//AsyncStorage.setItem('history', this.state.history);

		// clear current state
		this.setState({
			liter: '',
			price: '',
			current: ''
		})
	},
	render: function () {
		return (
			<TabBarIOS tintColor="white" barTintColor="darkslateblue">
				<TabBarItemIOS name="Tanken" iconName={'ion|ios-paper-outline'} title="Tanken" systemIcon="history"
							   selected={this.state.selectedTab === 'refill'}
							   onPress={() => {
                    this.setState({
                        selectedTab: 'refill'
                    });
                }}>
					{this._renderRefill()}
				</TabBarItemIOS>
				<TabBarItemIOS name="Verlauf" iconName={'ion|ios-paper-outline'} title="Verlauf"
							   selected={this.state.selectedTab === 'history'}
							   onPress={() => {
                    this.setState({
                        selectedTab: 'history'
                    });
                }}>
					{this._renderHistory()}
				</TabBarItemIOS>
			</TabBarIOS>
		);
	}
});

var reacttanken = new Application();

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
	button: {
		backgroundColor: '#169EA5',
		padding: 10,
		color: '#50CCD4',
		borderRadius: 3
	},
	text: {
		color: '#fff'
	},
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
