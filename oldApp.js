/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from 'react-native-voice';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
    };

    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    console.log('eeeeeee starttt', e.value);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized(e) {
    console.log('eeeeeee recog', e.value);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechResults(e) {
    console.log('eeeeeee vvvvvv', e.value);
    this.setState({
      results: e.value,
    });
  }

  async _startRecognition(e) {
    //await Voice.destroy();
    this.setState({
      recognized: '',
      started: '',
      results: [],
    }, () => {
      Voice.start('en-US').then(res => {
        console.log('qqqqqqqq', res);
      }).catch(err => console.log('wwwwwwwww', err));
    })
    // try {
    //   await Voice.start('en-US');
    // } catch (e) {
    //   console.error('vvvvvvvv', e);
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text style={styles.transcript}>
          Transcript
        </Text>
        {this.state.results.map((result, index) => <Text key={index} style={styles.transcript}> {result}</Text>
        )}
        <Button style={styles.transcript}
          onPress={this._startRecognition.bind(this)}
          title="Start"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
