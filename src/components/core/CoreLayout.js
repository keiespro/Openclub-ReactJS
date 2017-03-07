import React from 'react'
import { Layout } from 'antd'
import Header from 'components/layout/Header'
const { Content } = Layout

const CoreLayout = ({ children }) => (
  <Layout>
    <Header/>
    <Content>
      {children}
    </Content>
  </Layout>
)

export default CoreLayout
