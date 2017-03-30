/**
 * component for displaying a column icon with a header and content text
 */
import React from 'react'
import { Row, Col, Icon } from 'antd'

import './TextInfoIcon.css'

const TextInfoIcon = ({ icon, title, children }) => (
  <Row className="oc-textinfoicon">
    <Col span={2}>
      <Icon type={icon}/>
    </Col>
    <Col span={22}>
      <h4>{title}</h4>
      {children}
    </Col>
  </Row>
)

export default TextInfoIcon
