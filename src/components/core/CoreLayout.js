import React from 'react'
import { Layout } from 'antd'
import Header from 'components/layout/Header'
import Sidebar from 'components/layout/Sidebar'
import Drawer from 'rc-drawer'
import 'rc-drawer/assets/index.css'

const { Content } = Layout

const CoreLayout = ({ children }) => (
  <Drawer sidebar={<Sidebar/>} open={true} docked={true} style={{ overflow: 'auto' }}>
    <Layout>
      <Header/>
      <Content>
        {children}
      </Content>
    </Layout>
  </Drawer>
)

export default CoreLayout
