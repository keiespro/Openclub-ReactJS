import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { DateField } from 'react-date-picker'

import 'react-date-picker/index.css'

const DateTimeRange = ({ input, label, type, meta }) => (
  <Row>
    <Col xs={12} md={4}>
      <DateField
        defaultValue={"01-02-2017 03:24 PM"}
        dateFormat="DD-MM-YYYY hh:mm a"
      />
    </Col>
    <Col xs={12} md={4}>
      <DateField
        defaultValue={"01-03-2017"}
        dateFormat="DD-MM-YYYY"
      />
    </Col>
  </Row>
)

export default DateTimeRange
