const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      default:
        isValid = true;
    }
  }

  return isValid;
}

const emailValidator = (val) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return re.test(String(val).toLowerCase());
}

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
}

const equalToValidator = (val, chackValue) => {
  return val === chackValue
}

export default validate;
