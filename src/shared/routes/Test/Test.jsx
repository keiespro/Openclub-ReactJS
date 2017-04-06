import React from 'react'
import {
  ContentPage,
  PageHeader
} from 'components/layout'

import StripeCreditCardField from 'components/custom_form_fields/StripeCreditCardField'

export default props => (
  <ContentPage>
    <PageHeader title="Test Stuff" />
    <StripeCreditCardField />
  </ContentPage>
)
