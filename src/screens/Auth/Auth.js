import React, { Component } from 'react';
import { View, Button, ImageBackground, StyleSheet } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import startMainTabs from '../MainTabs/startMainTabs';
import BackgroundImage from '../../assets/wallhaven-372613.png'; 

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} >
        <View style={styles.container}>
          <HeadingText style={styles.textHeading}>Please Log in</HeadingText>
          <ButtonWithBackground color="#29aaf4">Swith to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Your email" style={styles.input} />
            <DefaultInput placeholder="Your password" style={styles.input} />
            <DefaultInput placeholder="confirm password" style={styles.input} />
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  }
});

export default AuthScreen;