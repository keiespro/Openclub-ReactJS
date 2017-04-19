import React, { Component, PropTypes } from 'react';

class CategoryCard extends Component {
  render() {
    const { type, name, ...rest } = this.props
    return <a {...rest} className={`category-card ${type}`}>{name}</a>
  }
}
export default CategoryCard
