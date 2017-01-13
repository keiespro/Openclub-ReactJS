import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import './styles/PageLayout.scss'

const PageLayout = ({ children }) => {
  return (
    <Grid className="page-full">
      <Row>
        <Col xs={12}>{children}</Col>
      </Row>
    </Grid>
  )
}

export default PageLayout