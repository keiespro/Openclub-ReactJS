import { australianBSB, empty, canadaTransitNumber, canadaInstituteNumber, singaporeBankCode, singaporeBranchCode, gbIBAN, ieIBAN } from 'utils/form_validation/errors'
export const formPrefix = 'ant-form'

export const durations = {
  lookup: {
    YEARLY: 'Annually',
    MONTHLY: 'Monthly',
    WEEKLY: 'Weekly'
  },
  lookupPer: {
    YEARLY: 'per year',
    MONTHLY: 'per month',
    WEEKLY: 'per week'
  },
  list: ['YEARLY', 'MONTHLY', 'WEEKLY']
}

export const countries = [
  { value: 'AU', title: 'Australia' },
  { value: 'CA', title: 'Canada' },
  { value: 'IE', title: 'Ireland' },
  { value: 'NZ', title: 'New Zealand' },
  { value: 'SG', title: 'Singapore' },
  { value: 'GB', title: 'United Kingdon' },
  { value: 'US', title: 'United States' }
]

export const bankByCountry = {
  'AU': {
    type: 2,
    routing_number: {
      name: 'BSB',
      validation: australianBSB,
      width: '30%'
    },
    account_number: {
      name: 'Account Number',
      validation: empty,
      width: '70%'
    }
  },
  'CA': {
    type: 3,
    transit_number: {
      name: 'Transit Number',
      validation: canadaTransitNumber,
      width: '30%'
    },
    routing_number: {
      name: 'Institute Number',
      validation: canadaInstituteNumber,
      width: '30%'
    },
    account_number: {
      name: 'Account Number',
      validation: empty,
      width: '40%'
    }
  },
  'IE': {
    type: 1,
    account_number: {
      name: 'IBAN',
      validation: ieIBAN,
      width: '100%'
    }
  },
  'NZ': {
    type: 2,
    routing_number: {
      name: 'Bank + Branch Number',
      validation: empty,
      width: '40%'
    },
    account_number: {
      name: 'Account Number',
      validation: empty,
      width: '60%'
    }
  },
  'SG': {
    type: 3,
    transit_number: {
      name: 'Bank Code',
      validation: singaporeBankCode,
      width: '20%'
    },
    routing_number: {
      name: 'Branch Code',
      validation: singaporeBranchCode,
      width: '30%'
    },
    account_number: {
      name: 'Account Number',
      validation: empty,
      width: '50%'
    }
  },
  'GB': {
    type: 1,
    account_number: {
      name: 'IBAN',
      validation: gbIBAN,
      width: '100%'
    }
  },
  'US': {
    type: 2,
    routing_number: {
      name: 'Routing Number',
      validation: empty,
      width: '50%'
    },
    account_number: {
      name: 'Account Number',
      validation: empty,
      width: '50%'
    }
  }
}
