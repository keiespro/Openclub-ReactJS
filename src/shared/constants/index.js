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
      validation: australianBSB
    },
    account_number: {
      title: 'Account Number',
      validation: empty
    }
  },
  'CA': {
    type: 3,
    transit_number: {
      name: 'Transit Number',
      validation: canadaTransitNumber
    },
    routing_number: {
      name: 'Institute Number',
      validation: canadaInstituteNumber
    },
    account_number: {
      title: 'Account Number',
      validation: empty
    }
  },
  'IE': {
    type: 1,
    account_number: {
      title: 'IBAN',
      validation: ieIBAN
    }
  },
  'NZ': {
    type: 2,
    routing_number: {
      name: 'Bank + Branch Number',
      validation: empty
    },
    account_number: {
      title: 'Account Number',
      validation: empty
    }
  },
  'SG': {
    type: 3,
    transit_number: {
      name: 'Bank Code',
      validation: singaporeBankCode
    },
    routing_number: {
      name: 'Branch Code',
      validation: singaporeBranchCode
    },
    account_number: {
      title: 'Account Number',
      validation: empty
    }
  },
  'GB': {
    type: 1,
    account_number: {
      title: 'IBAN',
      validation: gbIBAN
    }
  },
  'US': {
    type: 2,
    routing_number: {
      name: 'Routing Number',
      validation: empty
    },
    account_number: {
      title: 'Account Number',
      validation: empty
    }
  }
}
