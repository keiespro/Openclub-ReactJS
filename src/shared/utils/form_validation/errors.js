/**
 * List of error based validation functions and related messages
 */

const required = val => !val || val.length <= 0 ?
  'This field must have a value.' : undefined

const minLength = len => val => !val || val.length < len ?
  `This field must be at least ${len} characters long.` : undefined

const maxLength = len => val => val && val.length > len ?
  `This field must be no more than ${len} characters long.` : undefined

const email = val => val && !val.match(/^[\w\d._%+-]+@[\w\d.-]+\.[\w]{2,}/) ?
  'Please enter a valid email address.' : undefined

const phone = val => val && !val.match(/^[\d\s()+]{6,}/) ?
  'Please enter a valid phone number.' : undefined

const name = val => val && !val.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/) ?
  'Names can only contain dictionary characters (a-z) and punctuation (\',-.).' : undefined

const object_name = val => val && !val.match(/^[\w\s\d'-]+$/) ?
  'Names must contain only dictionary characters, punctuation, underscores and numbers.' : undefined

const slug = val => val && !val.match(/^[\w\d]+(?:-[\w\d]+)*$/) ?
  'URLs can only contain lowercase letters (a-z), numbers (0-9) and hyphens (-), and cannot start or end with a hyphen (-).' : undefined

const abn = val => val && !val.match(/^(\d *?){9,11}$/) ?
  'Please enter a valid Australian Business Number (ABN).' : undefined

const vat = val => val && !val.match(/^[\w]{2}?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})$/) ?
  'Please enter a valid VAT number.' : undefined

const nzbn = val => val && !val.match(/^(\d *?){13}$/) ?
  'Please enter a valid New Zealand Business Number (NZBN).' : undefined

const number = val => val && !val.match(/^[\d]+$/) ?
  'Please only enter numbers.' : undefined

const money = val => val && !val.match(/^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/) ?
  'Please enter a valid monetary amount' : undefined

const url = val => val && !val.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi) ?
  'Please enter a valid URL' : undefined

const empty = val => undefined;

export {
  required,
  minLength,
  maxLength,
  email,
  phone,
  name,
  object_name,
  slug,
  abn,
  vat,
  nzbn,
  number,
  money,
  url,
  empty
}
