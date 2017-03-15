/**
 * Use this route to perform any sort of component testing
 * TODO: remove this route when going live
 */
import React from 'react'
import TestForm from 'components/forms/TestForm'
import {
  ContentPage,
  PageHeader
} from 'components/layout'

export default props => (
  <ContentPage>
    <PageHeader title="Test Stuff"/>
    <TestForm/>
  </ContentPage>
)
