import React from 'react'
import CreateClubForm from 'components/forms/CreateClubForm'
import PageHeader from 'components/layout/PageHeader'

const Home = props => {

  const createTheClub = values => {
    console.log(values)
  }

  return (
    <div>
      <PageHeader></PageHeader>
      <CreateClubForm onSubmit={createTheClub}/>
    </div>
  )
}

export default Home
