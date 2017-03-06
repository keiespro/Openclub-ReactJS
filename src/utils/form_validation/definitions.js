
const errors = {
  blank: val => val.match(/^.*$/),
  message: 'Some error'
}

export {
  errors:
}

const definitions = {
  /*
  template: {
    expression: new RegExp('') | /^[a-zA-Z]+$/,
    type: 'warning|error',
    message: 'Please enter a valid message'
  }
  */
  blank: {
    expression: /^.*$/,
    type: 'error',
    message: 'If you get this error, RegExp has gone wrong.'
  },
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
  },
  abn: {
    expression: /^(\d *?){11}$/,
    type: 'error',
    message: 'Please enter a valid Australian Business Number (ABN).'
  },
  vat: {
    expression: /^(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})$/,
    type: 'error',
    message: 'Please enter a valid United Kingdom VAT number.'
  },
  nzbn: {
    expression: /^(\d *?){13}$/,
    type: 'error',
    message: 'Please enter a valid New Zealand Business Number (NZBN).'
  },
  number: {
    expression: /^[\d]+$/,
    type: 'error',
    message: 'Please only enter numbers.'
  }
};

export default definitions;