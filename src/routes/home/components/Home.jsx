import React from 'react'
import TestForm from 'components/forms/TestForm'
import PageHeader from 'components/layout/PageHeader'

const Home = props => {

  const testTheForm = values => {
    console.log(values)
  }

  return (
    <div>
      <PageHeader></PageHeader>
      <TestForm onSubmit={testTheForm}/>
    </div>
  )
}

export default Home
