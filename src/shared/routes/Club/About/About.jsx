import React from 'react'
import { Row, Col, Icon } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import { TextInfoIcon } from 'components/display'

const About = ({ club }) => (
  <Row>
    <Col xs={24} md={14}>
      <ContentPage>
        <PageHeader title="About"/>
        <div>My Club was </div>
      </ContentPage>
    </Col>
    <Col xs={24} md={10}>
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
    <Col xs={24} md={14}>
      <ContentPage>
        <PageHeader title="Extra Details"/>
        <div>Other club deets</div>
      </ContentPage>
    </Col>
  </Row>
)
  /*}
  <ContentPage>
    <PageHeader title="About"/>
      <Row>
        <Col xs={24} lg={12}>
          <div className="card">
            <div className="card-heading">
              <div className="card-title">
                Contact Details
              </div>
            </div>
            <div className="card-body">
              <div className="mda-list">

                <div className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-envelope" />
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>Club enquiries email</h3>
                    <h4>cheese@openclub.io</h4>
                  </div>
                </div>

                <div className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-phone" />
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>Club enquiries phone</h3>
                    <h4>1800 696 969</h4>
                  </div>
                </div>

                <div className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-instagram" />
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>Instagram</h3>
                    <h4><a href="http://www.instagram.com/cheese" target="_blank">@cheese</a></h4>
                  </div>
                </div>

                <div className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-globe" />
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>Website</h3>
                    <h4><a href="http://www.cheese.com.au/" target="_blank">{"http://www.cheese.com.au/"}</a></h4>
                  </div>
                </div>

              </div>
            </div>
            <div className="card-heading">
              <div className="card-title">
                More details
              </div>
            </div>
            <div className="card-body">
              <div className="mda-list">

                <div className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-calendar" />
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>Founded</h3>
                    <h4>1969</h4>
                  </div>
                </div>


                <div className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-user" />
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>Minimum age</h3>
                    <h4>18+</h4>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Col>

    </Row>
  </ContentPage>*/


export default About
