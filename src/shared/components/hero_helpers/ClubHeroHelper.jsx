import React from 'react'
import { Steps } from 'antd'
import { ContentPage } from 'components/layout'

const Step = Steps.Step

const ClubHeroHelper = props => (
  <ContentPage>
    <Steps>
      <Step title="Membership Plans" description="Create membership plans so that members can join"/>
      <Step title="Bank Details" description="Add bank information so that you can receive payments"/>
      <Step title="Club Profile" description="Complete your club profile"/>
    </Steps>
  </ContentPage>
)

export default ClubHeroHelper
