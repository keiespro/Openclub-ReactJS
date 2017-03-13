import React from 'react'
import './styles/PageHeader.scss'

const PageHeader = ({ title, subtitle }) => (
  <div className="oc-page-header">
    <h2>{title}</h2><small>{subtitle}</small>
  </div>
)

export default PageHeader