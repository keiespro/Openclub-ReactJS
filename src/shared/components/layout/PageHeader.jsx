import React from 'react'

import './PageHeader.scss'

const PageHeader = ({ title, subtitle }) => (
  <div className="oc-page-header">
    <h3>{title}</h3><small>{subtitle}</small>
  </div>
)

export default PageHeader
