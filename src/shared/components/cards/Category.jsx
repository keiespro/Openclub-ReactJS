import React, { Component, PropTypes } from 'react';
import './Category.scss'

class CategoryCard extends Component {
  render() {
    const { type, children, ...rest } = this.props
    return <a {...rest} className={`oc-card-category ${type}`}>{children}</a>
  }
}
export default CategoryCard
