const definitions = {
  /*
  template: {
    expression: new RegExp('') | /^[a-zA-Z]+$/,
    type: 'warning|error',
    message: 'Please enter a valid message'
  }
  */
  not_blank: {
    expression: /^.{1,}/,
    type: 'error',
    message: 'Please enter a value.'
  },
  email: {
    expression: /^[\w\d._%+-]+@[\w\d.-]+\.[\w]{2,}/,
    type: 'error',
    message: 'Please enter a valid email address.'
  },
  phone: {
    expression: /^[\d\s()+]{6,}/,
    type: 'error',
    message: 'Please enter a valid phone number.'
  },
  name: {
    expression: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/,
    type: 'error',
    message: 'Names can only contain dictionary characters (a-z) and punctuation (\',-.).'
  },
  object_name: {
    expression: /^[\w\s\d'-]+$/,
    type: 'error',
    message: 'Names must contain only dictionary characters, punctuation, underscores and numbers.'
  },
  slug: {
    expression: /^[^-][a-z0-9-]+[^-]$/,
    type: 'error',
    message: 'URLs can only contain lowercase letters (a-z), numbers (0-9) and hyphens (-), and cannot start or end with a hyphen (-).'
  }
};

export default definitions;
