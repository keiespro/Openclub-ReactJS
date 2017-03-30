import React from 'react'
import { Row, Col, Icon } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import { TextInfoIcon } from 'components/display'

const About = ({ club }) => (
  <Row gutter={20}>
    <Col xs={24} md={15}>
      <ContentPage>
        <PageHeader title="About"/>
        <div>My Club was started in the 90s and was created to be the best club for people just like you. It caters to everyone and holds frequent events that are great to attend. We reward our members by providing them the best service a club possibly can.</div>
      </ContentPage>
      <ContentPage>
        <PageHeader title="Extra Details"/>
        <TextInfoIcon icon="calendar" title="Founded">
          Club was founded in <b>1992</b>
        </TextInfoIcon>
        <TextInfoIcon icon="user" title="Minimum Age">
          This club has an 18+ restriction
        </TextInfoIcon>
      </ContentPage>
    </Col>
    <Col xs={24} md={9}>
      <ContentPage>
        <PageHeader title="Contact Details"/>
          <TextInfoIcon icon="mail" title="Club Enquiries Email">
            <a href="mailto:test@test.com">enquiries@myclub.com</a>
          </TextInfoIcon>
          <TextInfoIcon icon="phone" title="Club Enquiries Phone">
            1800 696 969
          </TextInfoIcon>
          <TextInfoIcon icon="global" title="Website">
            <a href="http://test.com">myclub.com</a>
          </TextInfoIcon>
          <TextInfoIcon icon="picture" title="Instagram">
            <a href="http://instagram.com/myclub">@myclub</a>
          </TextInfoIcon>
      </ContentPage>
    </Col>
  </Row>
)

export default About
