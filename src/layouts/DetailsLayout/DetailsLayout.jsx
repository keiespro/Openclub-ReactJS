import React, { Component, Children, PropTypes } from 'react'
import { Row, Col, PanelGroup, Collapse } from 'react-bootstrap'
import DetailsItem from './DetailsItem'
import DetailsHeader from './DetailsHeader'
import './styles/DetailsLayout.scss'

const DetailsLayout = ({ location: { query }, children, defaultPageId }) => {
  const currentId = query.page || defaultPageId

  return (
    <div className="details-container">
      <div className="details-headings">
        {React.Children.map(children, c => (
          <div>
            <DetailsHeader
              active={c.props.pageId === currentId}
              location={location}
              key={`iheader${c.key}`}
              pageId={c.props.pageId}
            >{c.props.header}</DetailsHeader>
            {c.props.pageId === currentId &&
            <div className="hidden-lg hidden-md">
              <Collapse in={true}>
                {c}
              </Collapse>
            </div>}
          </div>
        ))}
      </div>
      <div className="details-body hidden-sm hidden-xs">
        {React.Children.toArray(children).filter(c => c.props.pageId === currentId)}
      </div>
    </div>
  )
}

DetailsLayout.propTypes = {
  children: (props, propName, componentName) => {
    React.Children.forEach(props[propName], c => {
      if (c.type !== DetailsItem) {
        return new Error('`' + componentName + '` children should be of type `DetailsItem`.');
      }
    })
  }
}

export default DetailsLayout
