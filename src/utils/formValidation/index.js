import definitions from './definitions';
import _ from 'lodash';

class formValidation {
  constructor() {
    this.inputs = {};
  }
  test(value, validation) {
    const maxTest = validation.match(/max([\d]+)/);
    const minTest = validation.match(/max([\d]+)/);

    if (maxTest) {
      const conditions = {
        name,
        type: 'error',
        message: `The input must be less than ${maxTest[1]} characters.`
      }
      return value.length > maxTest[1] ? conditions : false;
    }
    if (minTest) {
      const conditions = {
        name,
        type: 'error',
        message: `This input must be more than ${minTest[1]} characters.`
      }
      return value.length < minTest[1] ? conditions : false;
    }
    return definitions[validation].expression.test(value) ? _.assign(definitions[validation], { name }) : false;
  }
  check(name, validations, value) {
    console.log(arguments);
    if (validations instanceof Array === false) {
      throw new Error("Validations must be an array.")
    }
    if (_.hasIn(definitions, validations) === false) {
      throw new Error("Please ensure validations exist within definitions.")
    }
    this.inputs[name] = {
      validations,
      value
    };
    try {
      validations.map((validation) => {
        const test = this.test(value, validation);
        if (test) {
          throw test;
        }
        return false;
      });
      return false;
    } catch (e) {
      return e;
    }
  }
  checkAll() {
    try {
      Object.keys(this.inputs).map((value) => {
        const input = this.inputs[value];
        let test = this.check(value, input.validations, input.value);
        if (test) {
          throw test;
        }
        return false;
      });
      return false;

    } catch (e) {
      document.body.scrollTop = document.getElementById(`formcontrol-${e.name}`).getBoundingClientRect() + document.body.scrollTop
      return e;
    }
  }
}
export default formValidation;
