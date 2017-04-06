import React, { Component, PropTypes } from 'react';
import './Category.scss'

class CategoryCard extends Component {
  render() {
    const { type, children } = this.props
    return <div className={`oc-card-category ${type}`}>{children}</div>
  }
}
export default CategoryCard
