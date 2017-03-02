import React from 'react'

const PageHeader = ({ title, subtitle }) => (
  <div className="oc-page-header">
    <h2>{title}</h2><small>{subtitle}</small>
  </div>
)

export default PageHeader
