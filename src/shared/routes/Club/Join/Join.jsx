import React from 'react'
import { Row, Col, Icon } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import JoinClubForm from 'components/forms/JoinClubForm'

const Join = ({ club }) => (
  <ContentPage>
    <PageHeader title={`Join ${club.name}`}/>
    <JoinClubForm club={club}/>
  </ContentPage>
)

export default Join
