import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { connect } from 'react-redux';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import { tryAuth } from '../../store/actions';

import startMainTabs from '../MainTabs/startMainTabs';
import BackgroundImage from '../../assets/wallhaven-372613.png';
import validate from '../../utility/validation';

class AuthScreen extends Component {
  state = {
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  }

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === 'login' ? 'signup' : 'login'
    }))
  }

  loginHandler = () => {
    const { email, password } = this.state.controls;
    const authData = {
      email: email.value,
      password: password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  }

  render() {
    let headingText = null;
    let confirmPasswordControl = null;
    const { email, password, confirmPassword } = this.state.controls;

    if (Dimensions.get('window').height > 500) {
      headingText = (
        <HeadingText style={styles.textHeading}>Please Log in</HeadingText>
      );
    }

    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <DefaultInput
          placeholder="confirm password"
          style={styles.input}
          value={confirmPassword.value}
          valid={confirmPassword.valid}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          touched={confirmPassword.touched}
          onChangeText={(val) => this.updateInputState('confirmPassword', val)}
        />
      )
    }

    return (
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage} >
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          {headingText}
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
            >Swith to {this.state.authMode === 'login' ? 'signup' : 'login'}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your email"
                style={styles.input}
                value={email.value}
                onChangeText={(val) => this.updateInputState('email', val)}
                valid={email.valid}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                touched={email.touched}
              />
              <DefaultInput
                placeholder="Your password"
                style={styles.input}
                value={password.value}
                valid={password.valid}
                autoCapitalize="none"
                secureTextEntry
                autoCorrect={false}
                touched={password.touched}
                onChangeText={(val) => this.updateInputState('password', val)}
              />
              {confirmPasswordControl}
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.loginHandler}
            disabled={!email.valid || !password.valid || !confirmPassword.valid && this.state.authMode === 'signup'}
            >Submit
          </ButtonWithBackground>
        </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (authData) => dispatch(tryAuth(authData))
  }
}

export default connect(null, mapDispatchToProps)(AuthScreen);