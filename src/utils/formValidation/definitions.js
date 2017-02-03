const definitions = {
  /*
  template: {
    expression: new RegExp('') | /^[a-zA-Z]+$/,
    type: 'warning|error',
    message: 'Please enter a valid message'
  }
  */

  email: {
    expression: /^[\w\d._%+-]+@[\w\d.-]+\.[\w]{2,}/,
    type: 'error',
    message: 'Please enter a valid email address,'
  },
  phone: {
    expression: /^[\d\s()+]+/,
    type: 'error',
    message: 'Please enter a valid phone number.'
  }
};

export default definitions;
