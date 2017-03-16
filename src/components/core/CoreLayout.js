import React from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout } from 'antd'
import Header from 'components/layout/Header'
import Sidebar from 'components/layout/Sidebar'
import Drawer from 'rc-drawer'
import { logoutUser } from 'modules/auth/actions'
import 'rc-drawer/assets/index.css'

import './CoreLayout.scss'

const { Content } = Layout

const CoreLayout = ({ data = {}, children }) => (
  <Drawer sidebar={<Sidebar user={data.user}/>} open={true} docked={true} style={{ overflow: 'auto' }}>
    <Layout>
      <Header user={data.user}/>
      <Content>
        {children}
      </Content>
    </Layout>
  </Drawer>
)

const currentViewer = gql`
  query currentViewer {
    user {
      _id
      email
      name
      images {
        thumb
        square
      }
      clubs {
        _id
        slug
        name
        images {
          thumb
        }
      }
    }
  }
`

// connect to apollo
const CoreLayoutWithApollo = graphql(currentViewer, {
  skip: ownProps => {
    return !ownProps.token
  }
})(CoreLayout)

// connect to redux
export default connect(state => ({
  token: state.auth.token
}), { logoutUser })(CoreLayoutWithApollo)

export {
  CoreLayout
}
