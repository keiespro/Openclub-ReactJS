import React from 'react'
import { Row, Col, Icon } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'

const Join = ({ club }) => (
  <ContentPage>
    <PageHeader title={`Join ${club.name}`}/>
  </ContentPage>
)

export default Join
