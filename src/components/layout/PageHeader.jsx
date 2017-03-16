import React from 'react'

import './PageHeader.scss'

const PageHeader = ({ title, subtitle }) => (
  <div className="oc-page-header">
    <h2>{title}</h2><small>{subtitle}</small>
  </div>
)

export default PageHeader
